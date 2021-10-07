import { Produto } from './../produto';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Produto[] = []
  load: boolean = true;
  displayedColumns = [
    'id', 
    'nome', 
    'fabricante',
    'lote',
    'dataFabricacao',
    'dataVencimento', 
    'action'
  ];

  constructor(
    private productService: ProdutoService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
      this.productService.read().subscribe(produtos => {
        this.products = produtos;
        this.load = false;
      })
    }, 1000);
  }

  deletar(item: any) {
    console.log(item);
    this.productService.delete(item.id).subscribe();
    this.reloadComponent();
  }

  editar(item: Produto) {
    const id: string = item.id.toString();
    this.router.navigate([`/editar-produto/${item.id}`]);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('nome', item.nome);
    sessionStorage.setItem('fabricante', item.fabricante);
    sessionStorage.setItem('dataFabricacao', item.dataFabricacao.toString());
    sessionStorage.setItem('dataVencimento', item.dataVencimento.toString());
    sessionStorage.setItem('lote', item.lote.toString());
    sessionStorage.setItem('quantidade', item.quantidade.toString());
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}

