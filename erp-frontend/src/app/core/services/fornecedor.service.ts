import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private static readonly ENDPOINT = 'fornecedores';

  constructor(private apiService: ApiService) {}

  listarFornecedores(): Observable<any[]> {
    return this.apiService.get<any[]>(FornecedorService.ENDPOINT);
  }

  obterFornecedorPorId(id: number): Observable<any> {
    return this.apiService.get(`${FornecedorService.ENDPOINT}/${id}`);
  }

  cadastrarFornecedor(fornecedor: any): Observable<any> {
    return this.apiService.post(FornecedorService.ENDPOINT, fornecedor);
  }

  atualizarFornecedor(id: number, fornecedor: any): Observable<any> {
    return this.apiService.put(`${FornecedorService.ENDPOINT}/${id}`, fornecedor);
  }

  excluirFornecedor(id: number): Observable<any> {
    return this.apiService.delete(`${FornecedorService.ENDPOINT}/${id}`);
  }

  listarEmpresasDoFornecedor(idFornecedor: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${FornecedorService.ENDPOINT}/${idFornecedor}/empresas`);
  }
}
