import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/auth/pages/welcome/welcome.component';
import { SignupOrganizerComponent } from './features/auth/pages/signup-organizer/signup-organizer.component';
import { SignupSuccessComponent } from './features/auth/pages/signup-success/signup-success.component';

//configuração de roteamento entre telas
export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupOrganizerComponent},
  {path: 'signup-success', component: SignupSuccessComponent}
];
