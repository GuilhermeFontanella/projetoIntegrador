import { ProdutoService } from './../produto.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../produto';
import { filter, find } from 'rxjs/operators';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  form!: FormGroup;
  formEdicao!: FormGroup;
  idItem: any;
  edicaoItem: any;
  telaCadastro: boolean = false;
  load: boolean = false;
  
  constructor(
    private formBuider: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService
    ) { this.idItem = sessionStorage.getItem('id'); }

  ngOnInit(): void {
    this.load = true;
    setTimeout(() => {
      this.criaFormulario();
      this.criaFormularioEditar();
      this.load = false;
    }, 1000);
    this.verificaRota(); 
  }

  verificaRota() {
    if (this.router.url !== '/adicionar-produto') {
      return this.telaCadastro = false;
    } else {
      return this.telaCadastro = true;
    } 
  }

  buildEdicaoItem() {
    this.edicaoItem = {
      nome: sessionStorage.getItem('nome'),
      fabricante: sessionStorage.getItem('fabricante'),
      dataFabricacao: sessionStorage.getItem('dataFabricacao'),
      dataVencimento: sessionStorage.getItem('dataVencimento'),
      lote: sessionStorage.getItem('lote'),
      quantidade: sessionStorage.getItem('quantidade')
    }
  }

  criaFormulario() {
    this.form = this.formBuider.group({
      nome: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
      dataFabricacao: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      quantidade: ['', [Validators.required]]
    })
  }

  criaFormularioEditar() {
    this.buildEdicaoItem();
      this.formEdicao = this.formBuider.group({
        id:[this.idItem],
        nome:[this.edicaoItem.nome],
        fabricante: [this.edicaoItem.fabricante],
        dataVencimento: [this.edicaoItem.dataVencimento],
        dataFabricacao: [this.edicaoItem.dataFabricacao],
        lote: [this.edicaoItem.lote],
        quantidade: [this.edicaoItem.quantidade]
      });
  }

  voltar() {
    this.router.navigate(['/'])
    sessionStorage.clear();
  }

  limpar() {
    this.form.reset();
  }

  salvar() {
    if(this.telaCadastro) {
      this.verificaExistente(this.form?.value, 1);
    };
    if(!this.telaCadastro) {
      this.verificaExistente(this.formEdicao?.value, 2);
    }
    
  }

  verificaExistente(obj: Produto, funcEnum: number) {
    this.produtoService.read().subscribe(resp => {
      const item = resp.find(e => e.nome === obj.nome)
      if (item) {
        this.produtoService.showMessage("Já existe um produto com esse nome");
      };
      if (!item) {
        if(funcEnum === 1) {
          this.produtoService.create(obj).subscribe();
          this.reloadComponent();
          this.produtoService.showMessage("Produto Cadastrado com Sucesso!");
        };
        if (funcEnum === 2) {
          this.produtoService.update(obj).subscribe();
          this.produtoService.showMessage("Produto Atualizado com Sucesso!");
          this.router.navigate(['/'])
        };
      }
    });      
  }

  reloadComponent() {
    this.produtoService.showMessage('Produto Adicionado com Sucesso!')
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }



}
