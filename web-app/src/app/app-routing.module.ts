import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'adicionar-produto', component: AdicionarProdutoComponent},
  {path: 'editar-produto/:id', component: AdicionarProdutoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
