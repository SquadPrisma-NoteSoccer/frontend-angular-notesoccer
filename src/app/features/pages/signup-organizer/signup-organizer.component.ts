import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupOrganizerService } from '../../services/signup-organizer.service';
import { Organizer } from '../../models/organizer';


@Component({
  selector: 'app-signup-organizer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-organizer.component.html',
  styleUrl: './signup-organizer.component.css'
})
export class SignupOrganizerComponent {

  signupForm: FormGroup;
  showPassword = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupOrganizerService: SignupOrganizerService
  ){
    this.signupForm = this.fb.group({
      //campos que devem ser validados e outros opcionais
      nome: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
        Validators.minLength(3),
        Validators.maxLength(60)
      ]],
      apelido: ['', [
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
        Validators.minLength(3),
        Validators.maxLength(60)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\S+@\S+\.\S+$/), // não permite espaços
        Validators.minLength(10),
        Validators.maxLength(60)
      ]],
      whatsapp: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]{2}\d{8,9}$/)
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/) // letras, números e caracteres especiais
  ]]
    });
  }



  //metodo de cadastro se estiver válido, exibe no console
  onSubmit() {
    if (this.signupForm.valid) {
      const organizer: Organizer = this.signupForm.value;
      console.log('Enviando para o backend:', organizer);

      this.signupOrganizerService.cadastrarOrganizador(organizer).subscribe({
        next: (response) => {

          const organizer = {
            id: response.userId,
            nome: response.nome,
            email: response.email
          };

          console.log('Resposta do backend:', response);

          // Salvar o organizador completo
          localStorage.setItem('organizer', JSON.stringify(response));

          // Salvar o token
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          alert(`Organizador cadastrado com sucesso!`);
          this.router.navigate(['/signup-success']);

        },
        error: (err) => {
          console.error('Erro ao cadastrar organizador:', err);
          alert('Erro ao cadastrar organizador. Verifique os dados e tente novamente.');
        }
      });

    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  //metodo para voltar para a tela de boas-vindas
  goWelcome() {
    this.router.navigate(['']);
  }

  goLogin() {
    this.router.navigate(['/login-organizer']);
  }

}
