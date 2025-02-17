import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { EmpresaService } from '../../../core/services/empresa.service';
import { CepService } from '../../../core/services/cep.service';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';

@Component({
  selector: 'app-detalhe-empresa',
  templateUrl: './detalhe-empresa.component.html',
  styleUrls: ['./detalhe-empresa.component.scss'],
  standalone: true,
  imports: [CommonModule, CnpjPipe]
})
export class DetalheEmpresaComponent implements OnInit {
  empresa: any;
  endereco: any;
  fornecedores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private cepService: CepService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarEmpresa(id);
    }
  }

  buscarEmpresa(id: string) {
    this.empresaService.obterEmpresaPorId(Number(id)).subscribe(data => {
      this.empresa = data;
      if (this.empresa.cep) {
        this.buscarCEP(this.empresa.cep);
      }
      this.buscarFornecedores(id);
    });
  }

  buscarCEP(cep: string) {
    this.cepService.buscarCEP(cep).subscribe(data => this.endereco = data);
  }

  buscarFornecedores(id: string) {
    this.empresaService.obterFornecedoresPorEmpresa(Number(id)).subscribe(data => {
      this.fornecedores = data;
    });
  }

  voltar() {
    this.location.back();
  }
}
