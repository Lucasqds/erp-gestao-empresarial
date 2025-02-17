import { FornecedorService } from './../../../core/services/fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from '../../../core/services/empresa.service';
import { CepService } from '../../../core/services/cep.service';
import { CepPipe } from '../../../shared/pipes/cep.pipe';
import { CpfCnpjPipe } from '../../../shared/pipes/cpfCnpj.pipe';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CepPipe, CpfCnpjPipe]
})
export class CadastrarEmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  fornecedores: any[] = [];
  fornecedoresSelecionados: Set<number> = new Set();

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private fornecedorService : FornecedorService,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, this.validarCNPJ]],
      cep: ['', [Validators.required]]
    });

    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.fornecedorService.listarFornecedores().subscribe(data => this.fornecedores = data);
  }
  

  toggleFornecedor(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.fornecedoresSelecionados.add(id);
    } else {
      this.fornecedoresSelecionados.delete(id);
    }
  }

  formatarCNPJ(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    this.empresaForm.get('cnpj')?.setValue(valor, { emitEvent: false });
  }

  formatarCEP(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    this.empresaForm.get('cep')?.setValue(valor, { emitEvent: false });
  }

  validarCNPJ(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value.replace(/\D/g, '');
    if (cnpj.length !== 14) {
      return { cnpjInvalido: true };
    }
    return null;
  }

  validarCEP() {
    const cep = this.empresaForm.get('cep')?.value;
    if (!cep) return;

    const cepFormatado = cep.replace(/\D/g, '');

    if (cepFormatado.length !== 8) {
      this.empresaForm.get('cep')?.setErrors({ cepInvalido: true });
      return;
    }

    this.cepService.buscarCEP(cepFormatado).subscribe(
      (data) => {
        if (data.erro) {
          this.empresaForm.get('cep')?.setErrors({ cepInvalido: true });
        } else {
          this.empresaForm.get('cep')?.setErrors(null);
        }
      },
      () => {
        this.empresaForm.get('cep')?.setErrors({ cepInvalido: true });
      }
    );
  }

  cadastrarEmpresa(): void {
    if (this.empresaForm.invalid) {
      alert('Preencha os campos corretamente!');
      return;
    }

    const empresaData = {
      ...this.empresaForm.value,
      fornecedores: Array.from(this.fornecedoresSelecionados)
    };

    this.empresaService.cadastrarEmpresa(empresaData).subscribe({
      next: () => {
        alert('Empresa cadastrada com sucesso!');
        this.empresaForm.reset({
          nomeFantasia: '',
          cnpj: '',
          cep: ''
        });
        this.fornecedoresSelecionados.clear();
        document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
        });
      },
      error: () => {
        alert('Erro ao cadastrar empresa.');
      }
    });
  }
}
