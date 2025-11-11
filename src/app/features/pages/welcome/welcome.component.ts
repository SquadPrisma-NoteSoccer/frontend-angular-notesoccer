import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [ CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  //metodo para ir á tela de cadastro, redireciona para rota /signup
  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
