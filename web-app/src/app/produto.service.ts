import { Produto } from './produto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = "http://localhost:3001/produtos";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, produto);
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  readById(id: number): Observable<Produto>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Produto>(url);
  }

  update(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/${produto.id}`;

    return this.http.put<Produto>(url, produto);
  }
  delete(id: number): Observable<Produto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Produto>(url);
  }
}

