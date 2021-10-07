import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarProdutoComponent } from './adicionar-produto.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AdicionarProdutoComponent
  ],
  exports: [AdicionarProdutoComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]

})
export class AdicionarProdutoModule { }
