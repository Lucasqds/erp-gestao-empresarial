import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private static readonly API_CEP_URL = environment.cepApiUrl;

  constructor(private http: HttpClient) {}

  buscarCEP(cep: string): Observable<any> {
    return this.http.get<any>(`${CepService.API_CEP_URL}/${cep}/json`);
  }
}
