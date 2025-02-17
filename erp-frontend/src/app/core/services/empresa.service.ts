import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private endpoint = 'empresas';

  constructor(private apiService: ApiService) {}

  listarEmpresas(): Observable<any> {
    return this.apiService.get(this.endpoint);
  }
  atualizarEmpresa(id: number, empresa: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, empresa);
  }
  excluirEmpresa(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  obterEmpresaPorId(id: number): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  cadastrarEmpresa(empresa: any): Observable<any> {
    return this.apiService.post(this.endpoint, empresa);
  }
  obterFornecedoresPorEmpresa(idEmpresa: number): Observable<any[]> {
    return this.apiService.get(`${this.endpoint}/${idEmpresa}/fornecedores`);
  }
  
  adicionarFornecedoresAEmpresa(idEmpresa: number, fornecedoresIds: number[]): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${idEmpresa}/adicionar-fornecedores`, { fornecedores: fornecedoresIds });
  }

  removerFornecedorDeEmpresa(idEmpresa: number, idFornecedor: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${idEmpresa}/remover-fornecedor/${idFornecedor}`);
  }
}
