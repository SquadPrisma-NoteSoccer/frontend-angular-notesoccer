import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      league: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*\s*$/),
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      teamName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*\s*$/),
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ]
    });


  }

  /** Adiciona uma nova liga se não existir ainda E se for válida */
  adicionaLiga() {
    const leagueControl = this.signupTeamForm.get('league');
    if (!leagueControl) return;

    const raw = String(leagueControl.value ?? '').trim();

    // valida via form control: se inválido, não adiciona e deixa a mensagem aparecer
    if (leagueControl.invalid) {
      leagueControl.markAsTouched();
      return;
    }
  }

  /** Adiciona time à lista local */
  AdicionaTimeLista() {
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

    this.atualizaCampoNomeDeTime();
  }

  // método para remover os times da lista
  removeTeam(index: number) {
    this.teams.splice(index, 1);
    this.atualizaCampoNomeDeTime();
  }


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

        const ligaId = ligaCriada.id;

        // Monta exatamente no formato do Swagger
        const payload = this.teams.map(team => ({ nome: team.nome }));

        this.teamService.cadastrarTimes(ligaId!, payload).subscribe({
          next: () => {
            alert(`Liga "${leagueName}" criada com ${this.teams.length} times!`);

            // Limpa a lista de times
            this.teams = [];

            // Limpa o campo do input de time
            this.signupTeamForm.get('teamName')?.reset();

            // Limpar a liga
            this.signupTeamForm.get('league')?.reset();

            this.isLoading = false;
          },
          error: err => {
            console.error('Erro ao cadastrar times em lote:', err);
            alert('Liga criada, mas houve erro ao cadastrar os times.');
            this.isLoading = false;
          }
        });
      },
      error: err => {
        console.error('Erro ao criar liga:', err);
        alert('Erro ao cadastrar liga.');
        this.isLoading = false;
      }
    });
  }

  // método para voltar para a tela anterior
  goBack() {
    this.router.navigate(['signup-success']);
  }

  // método para voltar para a tela de boas-vindas
  goWelcome() {
    this.router.navigate(['']);
  }

  //metodo que bloqueia quando o limite de 20 times for atingido
  private atualizaCampoNomeDeTime() {
    const control = this.signupTeamForm.get('teamName');
    if (!control) return;

    if (this.teams.length >= this.maxTeams) {
      control.disable({ emitEvent: false });
    } else {
      control.enable({ emitEvent: false });
    }
  }

}
