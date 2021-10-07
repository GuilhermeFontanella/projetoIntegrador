import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showFiller = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar(idLink: number) {
    if(idLink === 1) {
      this.router.navigate(['/'])
    }
    if(idLink === 2) {
      this.router.navigate(['/adicionar-produto'])
    }
    if(idLink === 3) {
      this.router.navigate(['/alterar-produto'])
    }
    if(idLink === 4) {
      this.router.navigate(['/excluir-produto'])
    }
    if(idLink === 5) {
      this.router.navigate(['/relatorio'])
    }
    
  }

}
