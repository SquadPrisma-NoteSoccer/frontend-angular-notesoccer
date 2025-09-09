import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-organizer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-organizer.component.html',
  styleUrl: './signup-organizer.component.css'
})
export class SignupOrganizerComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder){
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


}
