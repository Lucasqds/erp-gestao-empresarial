import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from '../../../core/services/empresa.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CnpjPipe]
})
export class ListarEmpresasComponent implements OnInit {
  
  empresas: any[] = [];
  empresasFiltradas: any[] = [];
  filtroNome = '';
  filtroCnpj = '';
  empresaForm!: FormGroup;
  empresaSelecionada: any;

  constructor(private empresaService: EmpresaService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.carregarEmpresas();
    this.inicializarFormulario();
  }

  carregarEmpresas() {
    this.empresaService.listarEmpresas().subscribe(data => {
      this.empresas = data;
      this.empresasFiltradas = data;
    });
  }

  verEmpresa(empresa: any) {
    this.router.navigate(['/empresas', empresa.id]);
  }

  inicializarFormulario() {
    this.empresaForm = this.fb.group({
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      cep: ['', Validators.required]
    });
  }

  gerenciarEmpresa(empresa: any, event: Event) {
    event.stopPropagation();
    this.router.navigate([`/empresas/${empresa.id}/gerenciar`]);
  }
  

  excluirEmpresa(empresa: any, event: Event) {
    event.stopPropagation();
    const confirmacao = confirm(`Tem certeza que deseja excluir ${empresa.nomeFantasia}?`);
    if (confirmacao) {
      this.empresaService.excluirEmpresa(empresa.id).subscribe({
        next: () => {
          this.carregarEmpresas();
        },
        error: () => {
          alert('Erro ao excluir empresa.');
        }
      });
    }
  }
}
