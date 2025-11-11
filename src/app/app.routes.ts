import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/pages/welcome/welcome.component';
import { SignupOrganizerComponent } from './features/pages/signup-organizer/signup-organizer.component';
import { SignupSuccessComponent } from './features/pages/signup-success/signup-success.component';
import { SignupTeamComponent } from './features/pages/signup-team/signup-team.component';
import { LoginOrganizerComponent } from './features/pages/login-organizer/login-organizer.component';

//configuração de roteamento entre telas
export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupOrganizerComponent},
  {path: 'signup-success', component: SignupSuccessComponent},
  {path: 'login-organizer', component: LoginOrganizerComponent},
  {path: 'signup-team', component: SignupTeamComponent}
];
