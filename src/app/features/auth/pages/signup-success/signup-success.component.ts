import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  imports: [],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {

  constructor(private router: Router) {  }

  //metodo para voltar para a tela anterior
  goBack() {
    this.router.navigate(['signup']);
  }

  //metodo para voltar para a tela de boas-vindas
  goWelcome() {
    this.router.navigate(['']);
  }

}
