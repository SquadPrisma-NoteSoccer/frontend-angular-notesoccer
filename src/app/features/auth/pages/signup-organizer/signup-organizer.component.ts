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
      //campos que devem ser validados
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  //metodo de cadastro se estiver válido, exibe no console
  onSubmit() {
    if(this.signupForm.valid) {
      console.log('Organizador cadastrado: ', this.signupForm.value);
    }
  }

  //metodo para voltar para a tela de boas-vindas
  goBack() {
    this.router.navigate(['']);
  }


}
