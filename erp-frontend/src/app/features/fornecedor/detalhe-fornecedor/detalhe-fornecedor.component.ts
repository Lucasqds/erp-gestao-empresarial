import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FornecedorService } from '../../../core/services/fornecedor.service';
import { CepService } from '../../../core/services/cep.service';
import { CpfCnpjPipe } from '../../../shared/pipes/cpfCnpj.pipe';

@Component({
  selector: 'app-detalhe-fornecedor',
  templateUrl: './detalhe-fornecedor.component.html',
  styleUrls: ['./detalhe-fornecedor.component.scss'],
  standalone: true,
  imports: [CommonModule, CpfCnpjPipe]
})
export class DetalheFornecedorComponent implements OnInit {
  fornecedor: any;
  endereco: any;
  empresas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private cepService: CepService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarFornecedor(+id);
    }
  }

  buscarFornecedor(id: number) {
    this.fornecedorService.obterFornecedorPorId(id).subscribe(data => {
      this.fornecedor = data;
      if (this.fornecedor.cep) {
        this.buscarCEP(this.fornecedor.cep);
      }
      this.buscarEmpresas(id);
    });
  }

  buscarCEP(cep: string) {
    this.cepService.buscarCEP(cep).subscribe(data => this.endereco = data);
  }

  buscarEmpresas(id: number) {
    this.fornecedorService.listarEmpresasDoFornecedor(id)
      .subscribe(data => this.empresas = data);
  }

  voltar() {
    this.location.back();
  }
}
