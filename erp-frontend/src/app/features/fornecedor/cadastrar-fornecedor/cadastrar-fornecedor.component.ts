import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FornecedorService } from '../../../core/services/fornecedor.service';
import { CepService } from '../../../core/services/cep.service';
import { CpfCnpjPipe } from '../../../shared/pipes/cpfCnpj.pipe';
import { RgPipe } from '../../../shared/pipes/rg.pipe';

@Component({
  selector: 'app-cadastrar-fornecedor',
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrls: ['./cadastrar-fornecedor.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CpfCnpjPipe, RgPipe]
})
export class CadastrarFornecedorComponent implements OnInit {

  maxDate: string = '';
  minDate: string = '';
  fornecedorForm!: FormGroup;
  isPessoaFisica = false;
  documentoTouched = false;
  rgTouched = false;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', [Validators.required, this.validarDocumento.bind(this)]],
      email: ['', [Validators.required, this.validarEmail]],
      rg: [''],
      dataNascimento: ['', this.validarIdade.bind(this)],
      cep: ['', [Validators.required, this.validarCEP]],
      estado: ['', Validators.required]
    });

    this.fornecedorForm.get('documento')?.valueChanges.subscribe(() => {
      this.atualizarValidacoes();
    });

    this.configurarLimiteDataNascimento();
  }

  atualizarValidacoes() {
    if (!this.fornecedorForm) return;

    if (this.isPessoaFisica) {
      this.fornecedorForm.get('rg')?.setValidators([Validators.required, this.validarRG]);
      this.fornecedorForm.get('dataNascimento')?.setValidators([Validators.required, this.validarIdade.bind(this)]);
    } else {
      this.fornecedorForm.get('rg')?.clearValidators();
      this.fornecedorForm.get('dataNascimento')?.clearValidators();
    }

    this.fornecedorForm.get('rg')?.updateValueAndValidity();
    this.fornecedorForm.get('dataNascimento')?.updateValueAndValidity();
  }

  validarDocumento(control: AbstractControl | null): ValidationErrors | null {
    if (!control) return null;
    const value = control.value ? control.value.replace(/\D/g, '') : '';

    if (value.length === 11) {
      this.isPessoaFisica = true;
    } else if (value.length === 14) {
      this.isPessoaFisica = false;
    } else if (value.length > 0) {
      return { documentoInvalido: true };
    }

    if (this.fornecedorForm) {
      this.atualizarValidacoes();
    }

    return null;
  }

  validarIdade(control: AbstractControl): ValidationErrors | null {
    const estado = this.fornecedorForm?.get('estado')?.value;
    const dataNascimento = control.value ? new Date(control.value) : null;

    if (!dataNascimento || isNaN(dataNascimento.getTime())) {
      return null;
    }

    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = dataNascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    if (estado === 'PR' && idade < 18) {
      return { menorDeIdade: true };
    }

    return null;
  }

  private configurarLimiteDataNascimento(): void {
    const hoje = new Date();
    this.maxDate = `${hoje.getFullYear() - 10}-12-31`;
    this.minDate = '1900-01-01';
  }
  onDocumentoBlur() {
    this.documentoTouched = true;
    this.fornecedorForm.get('documento')?.updateValueAndValidity();
  }

  validarCEP(control: AbstractControl): ValidationErrors | null {
    const cep = control.value ? control.value.replace(/\D/g, '') : '';
    if (cep.length !== 8) {
      return { cepInvalido: true };
    }
    return null;
  }

  buscarCEP() {
    const cep = this.fornecedorForm.get('cep')?.value.replace(/\D/g, '');
    if (cep.length === 8) {
      this.cepService.buscarCEP(cep).subscribe(data => {
        if (data.uf) {
          this.fornecedorForm.patchValue({ estado: data.uf });
          this.fornecedorForm.get('dataNascimento')?.updateValueAndValidity();
        }
      });
    }
  }

  cadastrarFornecedor() {
    if (this.fornecedorForm.invalid) {
      alert('Preencha os campos corretamente!');
      return;
    }
    
    const fornecedorData = {
      ...this.fornecedorForm.value,
      documento: this.fornecedorForm.get('documento')?.value.replace(/\D/g, '')
    };
  
    this.fornecedorService.cadastrarFornecedor(fornecedorData)
      .subscribe({
        next: () => {
          alert('Fornecedor cadastrado com sucesso!');
          this.fornecedorForm.reset();
          this.documentoTouched = false;
          this.rgTouched = false;
        },
        error: () => {
          alert('Erro ao cadastrar fornecedor!');
        }
      });
  }
  
  

  validarRG(control: AbstractControl): ValidationErrors | null {
    const value = control.value ? control.value.replace(/\D/g, '') : '';

    if (value.length !== 8 && value.length !== 9) {
      return { rgInvalido: true };
    }

    return null;
  }

  validarEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(control.value)) {
      return { emailInvalido: true };
    }

    return null;
  }
}
