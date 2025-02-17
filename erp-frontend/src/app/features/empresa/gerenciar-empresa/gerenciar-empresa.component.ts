import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { EmpresaService } from '../../../core/services/empresa.service';
import { FornecedorService } from '../../../core/services/fornecedor.service';
import { CpfCnpjPipe } from '../../../shared/pipes/cpfCnpj.pipe';

@Component({
  selector: 'app-gerenciar-empresa',
  templateUrl: './gerenciar-empresa.component.html',
  styleUrls: ['./gerenciar-empresa.component.scss'],
  standalone: true,
  imports: [CommonModule, CpfCnpjPipe]
})
export class GerenciarEmpresaComponent implements OnInit {
  empresa: any;
  fornecedoresVinculados: any[] = [];
  fornecedoresDisponiveis: any[] = [];
  fornecedoresSelecionados: Set<number> = new Set();
  exibirFornecedoresDisponiveis = false;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private fornecedorService: FornecedorService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarEmpresa(+id);
    }
  }

  buscarEmpresa(id: number) {
    this.empresaService.obterEmpresaPorId(id).subscribe(data => {
      this.empresa = data;
      this.buscarFornecedoresVinculados(id);
    });
  }

  buscarFornecedoresVinculados(id: number) {
    this.empresaService.obterFornecedoresPorEmpresa(id).subscribe(data => {
      this.fornecedoresVinculados = data;
    });
  }

  mostrarFornecedoresDisponiveis() {
    this.exibirFornecedoresDisponiveis = true;
    this.fornecedorService.listarFornecedores().subscribe(data => {
      this.fornecedoresDisponiveis = data;
    });
  }

  voltarParaFornecedoresVinculados() {
    this.exibirFornecedoresDisponiveis = false;
  }

  toggleFornecedorSelecionado(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.fornecedoresSelecionados.add(id);
    } else {
      this.fornecedoresSelecionados.delete(id);
    }
  }

  adicionarFornecedores() {
    if (this.fornecedoresSelecionados.size === 0) {
      alert('Selecione pelo menos um fornecedor para adicionar.');
      return;
    }

    this.empresaService.adicionarFornecedoresAEmpresa(this.empresa.id, Array.from(this.fornecedoresSelecionados))
      .subscribe({
        next: () => {
          alert('Fornecedores adicionados com sucesso!');
          this.exibirFornecedoresDisponiveis = false;
          this.buscarFornecedoresVinculados(this.empresa.id);
        },
        error: () => {
          alert('Erro ao adicionar fornecedores.');
        }
      });
  }

  removerFornecedor(fornecedor: any) {
    if (confirm(`Deseja remover o fornecedor ${fornecedor.nome}?`)) {
      this.empresaService.removerFornecedorDeEmpresa(this.empresa.id, fornecedor.id)
        .subscribe({
          next: () => {
            this.buscarFornecedoresVinculados(this.empresa.id);
          },
          error: () => {
            alert('Erro ao remover fornecedor.');
          }
        });
    }
  }

  voltar() {
    this.location.back();
  }
}
