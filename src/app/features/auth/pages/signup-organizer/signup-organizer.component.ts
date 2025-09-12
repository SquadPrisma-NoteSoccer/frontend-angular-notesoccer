import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-organizer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-organizer.component.html',
  styleUrl: './signup-organizer.component.css'
})
export class SignupOrganizerComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router){
    this.signupForm = this.fb.group({
      //campos que devem ser validados e outros opcionais
      name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
        Validators.minLength(3),
        Validators.maxLength(60)
      ]],
      nickname: ['', [
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
        Validators.pattern(/^[1-9]{2}[0-9]{8,9}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/) // letras, números e caracteres especiais
  ]]
    });
  }



  //metodo de cadastro se estiver válido, exibe no console
  onSubmit() {
    if(this.signupForm.valid) {
      alert('Cadastro realizado com sucesso!');
      console.log('Organizador cadastrado: ', this.signupForm.value);
    } else {
    alert('Preencha todos os campos obrigatórios corretamente.');
  }
  }

  //metodo para voltar para a tela de boas-vindas
  goBack() {
    this.router.navigate(['']);
  }


}
