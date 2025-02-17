import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CpfCnpjPipe } from '../../../shared/pipes/cpfCnpj.pipe';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FornecedorService } from '../../../core/services/fornecedor.service';

@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
  standalone: true,
  imports: [CommonModule, CpfCnpjPipe, ModalComponent, ReactiveFormsModule, FormsModule]
})
export class ListarFornecedoresComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  filtroNome = '';
  filtroCnpj = '';
  fornecedoresFiltrados: any[] = [];
  fornecedores: any[] = [];
  fornecedorForm!: FormGroup;
  fornecedorSelecionado: any;
  isEditing: boolean = false;

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.carregarFornecedores();
    this.inicializarFormulario();
  }

  filtrarFornecedor() {
    this.fornecedoresFiltrados = this.fornecedores.filter(fornecedor =>
      fornecedor.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) &&
      fornecedor.documento.includes(this.filtroCnpj)
    );
  }
  carregarFornecedores() {
    this.fornecedorService.listarFornecedores().subscribe(data => {
      this.fornecedores = data;
      this.fornecedoresFiltrados = data;
    });
  }
  verFornecedor(fornecedor: any) {
    this.router.navigate(['/fornecedores', fornecedor.id]);
  }

  inicializarFormulario() {
    this.fornecedorForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required]
    });
  }

  abrirModalEditar(fornecedor: any, event: Event) {
    event.stopPropagation();
    this.isEditing = true;
    this.fornecedorSelecionado = fornecedor;
    this.fornecedorForm.patchValue(fornecedor);
    this.modal.abrirModal();
  }

  abrirModalNovo() {
    this.isEditing = false;
    this.fornecedorSelecionado = null;
    this.fornecedorForm.reset();
    this.modal.abrirModal();
  }

  salvarFornecedor() {
    if (this.fornecedorForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    this.isEditing ? this.atualizarFornecedor() : this.adicionarFornecedor();
  }

  adicionarFornecedor() {
    this.fornecedorService.cadastrarFornecedor(this.fornecedorForm.value)
      .subscribe({
        next: () => {
          alert('Fornecedor adicionado com sucesso!');
          this.modal.fecharModal();
          this.carregarFornecedores();
        },
        error: () => {
          alert('Erro ao adicionar fornecedor.');
        }
      });
  }

  atualizarFornecedor() {
    const fornecedorAtualizado = { ...this.fornecedorSelecionado, ...this.fornecedorForm.value };

    this.fornecedorService.atualizarFornecedor(fornecedorAtualizado.id, fornecedorAtualizado)
      .subscribe({
        next: () => {
          alert('Fornecedor atualizado com sucesso!');
          this.modal.fecharModal();
          this.carregarFornecedores();
        },
        error: () => {
          alert('Erro ao atualizar fornecedor.');
        }
      });
  }

  excluirFornecedor(fornecedor: any, event: Event) {
    event.stopPropagation();

    if (confirm(`Deseja excluir o fornecedor ${fornecedor.nome}?`)) {
      this.fornecedorService.excluirFornecedor(fornecedor.id)
        .subscribe({
          next: () => {
            this.carregarFornecedores();
          },
          error: () => {
            alert('Erro ao excluir fornecedor.');
          }
        });
    }
  }

  fecharModal() {
    this.modal.fecharModal();
  }
}
