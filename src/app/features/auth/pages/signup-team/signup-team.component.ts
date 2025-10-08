import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-team',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup-team.component.html',
  styleUrl: './signup-team.component.css'
})
export class SignupTeamComponent {

  signupTeamForm: FormGroup;
  teamName: string = ''; // nome digitado no input
  teams: string[] = []; // lista de times
  maxTeams = 20;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupTeamForm = this.fb.group({
      teamName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]]
    });
  }

  // Método para adicionar o time à lista
  addTeam() {
    if (this.signupTeamForm.invalid) return;

    // Se já atingiu o limite máximo, bloqueia
    if (this.teams.length >= this.maxTeams) {
      alert('Limite máximo de 20 times atingido!');
      return;
    }

    const name = this.signupTeamForm.get('teamName')?.value.trim();

    // codigo para impedir de burlar com apenas espaços ou letras insuficientes
    const cleanName = name.replace(/\s+/g, ''); // remove espaços para contar letras reais
    if (cleanName.length < 3) {
      alert('O nome deve ter pelo menos 3 letras válidas.');
      return;
    }

    this.teams.push(name);
    this.signupTeamForm.reset();
  }

  //metodo para remover os times da lista
  removeTeam(index: number) {
    this.teams.splice(index, 1);
  }

  //metodo para voltar para a tela anterior
  goBack() {
    this.router.navigate(['signup-success']);
  }

  //metodo para voltar para a tela de boas-vindas
  goWelcome() {
    this.router.navigate(['']);
  }
}
