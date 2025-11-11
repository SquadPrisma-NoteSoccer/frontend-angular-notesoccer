import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-organizer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-organizer.component.html',
  styleUrl: './login-organizer.component.css'
})
export class LoginOrganizerComponent {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ){
  this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  //metodo para voltar para a tela de boas-vindas
  goWelcome() {
    this.router.navigate(['']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Tentando login com:', loginData);

      // Aqui depois faremos a integração com o backend
      alert('Login efetuado com sucesso!');
      this.router.navigate(['/home']); // troque para a rota desejada
    } else {
      alert('Preencha os campos corretamente.');
    }
  }

}
