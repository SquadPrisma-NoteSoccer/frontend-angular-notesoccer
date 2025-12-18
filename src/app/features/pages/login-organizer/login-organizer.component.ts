import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginOrganizerService } from '../../services/login-organizer.service';

@Component({
  selector: 'app-login-organizer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-organizer.component.html',
  styleUrl: './login-organizer.component.css'
})
export class LoginOrganizerComponent {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginOrganizerService
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

    const emailControl = this.loginForm.get('email');
    const senhaControl = this.loginForm.get('senha');

    const email = emailControl?.value?.trim();
    const senha = senhaControl?.value?.trim();

    // força exibição das validações visuais
    emailControl?.markAsTouched();
    senhaControl?.markAsTouched();

    // ambos vazios
    if (!email && !senha) {
      alert('Preencha os campos E-mail e Senha.');
      return;
    }

    // somente email vazio
    if (!email) {
      alert('O campo E-mail é obrigatório.');
      return;
    }

    // somente senha vazia
    if (!senha) {
      alert('O campo Senha é obrigatório.');
      return;
    }

    if (!this.loginForm.valid) {
      alert('Preencha os campos corretamente.');
      return;
    }

    const loginData = this.loginForm.value;

    this.loginService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login OK:', response);

        // Salvar token
        localStorage.setItem('token', response.token);

        // Montar organizer a partir da resposta
        const organizerData = {
          id: response.userId,
          nome: response.nome,
          email: response.email,
          role: response.role
        };

        localStorage.setItem('organizer', JSON.stringify(organizerData));

        alert('Login efetuado com sucesso!');
        this.router.navigate(['/signup-success']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
