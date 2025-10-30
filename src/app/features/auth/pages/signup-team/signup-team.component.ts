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
  teams: string[] = []; // lista de times
  maxTeams = 20;
  leagues: string[] = ['Liga Nacional', 'Copa Regional', 'Campeonato de Bairro', 'Torneio Municipal'];


  constructor(private fb: FormBuilder, private router: Router) {
    this.signupTeamForm = this.fb.group({
      league: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      teamName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]]
    });
  }

  /** Adiciona uma nova liga se não existir ainda E se for válida */
  addLeagueIfNew() {
    const leagueControl = this.signupTeamForm.get('league');
    if (!leagueControl) return;

    const raw = String(leagueControl.value ?? '').trim();

    // se campo vazio não faz nada (deixe o required ser exibido na validação final)
    if (!raw) return;

    // valida via form control: se inválido, não adiciona e deixa a mensagem aparecer
    if (leagueControl.invalid) {
      // opcional: forçar exibição dos erros
      leagueControl.markAsTouched();
    return;
    }

    // se válido e não existe, adiciona ao array de ligas
    if (raw && !this.leagues.includes(raw)) {
      this.leagues.push(raw);
    }

    // opcional: manter o valor selecionado (não resetar), ou resetar se preferir
    // leagueControl.setValue(raw); // já está com raw
  }


  // Método para adicionar o time à lista
  addTeam() {
    const nameControl = this.signupTeamForm.get('teamName');
    if (!nameControl || nameControl.invalid) return;

    if (this.teams.length >= this.maxTeams) {
      alert('Limite máximo de 20 times atingido!');
      return;
    }

    const name = nameControl.value.trim();
    const cleanName = name.replace(/\s+/g, '');
    if (cleanName.length < 3) {
      alert('O nome deve ter pelo menos 3 letras válidas.');
      return;
    }

    this.teams.push(name);
    nameControl.reset();
  }

  /** Validação final antes de seguir para a próxima etapa */
  goToPlayers() {
    const league = this.signupTeamForm.get('league')?.value;

    if (!league) {
      alert('Antes de prosseguir, selecione o nome da liga.');
      return;
    }

    if (this.teams.length === 0) {
      alert('Cadastre pelo menos um time antes de prosseguir.');
      return;
    }

    // Aqui você pode salvar no backend ou seguir para a próxima rota
    this.router.navigate(['signup-players']);
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
