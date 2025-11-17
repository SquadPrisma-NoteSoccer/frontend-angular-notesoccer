import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { League } from '../../models/league';
import { SignupLeagueService } from '../../services/signup-league.service';
import { SignupTeamService } from '../../services/signup-team.service';
import { Team } from '../../models/team';


@Component({
  selector: 'app-signup-team',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup-team.component.html',
  styleUrl: './signup-team.component.css'
})
export class SignupTeamComponent {

  signupTeamForm: FormGroup;
  teams: Team[] = []; // lista de times
  maxTeams = 20;
  leagues: string[] = ['Liga Nacional', 'Copa Regional', 'Campeonato de Bairro', 'Torneio Municipal'];
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private leagueService: SignupLeagueService,
    private teamService: SignupTeamService
  ) {
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


  /** Adiciona time à lista local */
  addTeam() {
    const nameControl = this.signupTeamForm.get('teamName');
    if (!nameControl || nameControl.invalid) {
      nameControl?.markAsTouched();
      return;
    }

    if (this.teams.length >= this.maxTeams) {
      alert('Limite máximo de 20 times atingido!');
      return;
    }

    const name = nameControl.value.trim();
    if (this.teams.some(t => t.nome.toLowerCase() === name.toLowerCase())) {
      alert('Já existe um time com esse nome.');
      return;
    }

    this.teams.push({ nome: name });
    nameControl.reset();
  }

  //metodo para remover os times da lista
  removeTeam(index: number) {
    this.teams.splice(index, 1);
  }

  /** Envia a liga e depois os times ao backend */
  salvarLigaETime() {
    const leagueName = this.signupTeamForm.get('league')?.value?.trim();
    if (!leagueName) {
      alert('O nome da liga é obrigatório.');
      return;
    }

    if (this.teams.length === 0) {
      alert('Cadastre pelo menos um time antes de continuar.');
      return;
    }

    this.isLoading = true;

    this.leagueService.registrarLiga(leagueName).subscribe({
      next: ligaCriada => {
        console.log('Liga criada:', ligaCriada);

        const ligaId = ligaCriada.id; // UUID CORRETO

        const requests = this.teams.map(team =>
          this.teamService.RegistrarTime(ligaId!, team)
        );

        forkJoin(requests).subscribe({
          next: () => {
            alert(`Liga "${leagueName}" criada com ${this.teams.length} times!`);
            this.isLoading = false;
          },
          error: err => {
            console.error('Erro ao cadastrar times:', err);
            alert('Liga criada, mas houve erro ao cadastrar alguns times.');
            this.isLoading = false;
          }
        });
      },
      error: err => {
        console.error('Erro ao criar liga:', err);
        alert('Erro ao cadastrar liga. Verifique os dados e tente novamente.');
        this.isLoading = false;
      }
    });
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
