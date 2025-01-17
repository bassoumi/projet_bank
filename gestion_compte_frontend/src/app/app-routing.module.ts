import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ServiceComponent } from './features/service/service.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TableauDeBordComponent } from './profile/tableau-de-bord/tableau-de-bord.component';
import { CreationCompteComponent } from './profile/creation-compte/creation-compte.component';
import { ConsultaionCompteComponent } from './profile/consultaion-compte/consultaion-compte.component';
import { DetailCompteComponent } from './profile/detail-compte/detail-compte.component';
import { authGuard } from './guards/auth.guard';
import { ModifierCompteComponent } from './profile/modifier-compte/modifier-compte.component';
import { HistoriqueComponent } from './profile/historique/historique.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }, // Route par défaut
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Service', component: ServiceComponent },
  { 
    path: 'Profile', 
    component: ProfileComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'consultaion', component: ConsultaionCompteComponent },
      { path: 'details/:id', component: DetailCompteComponent },
      { path: 'modifie', component: ModifierCompteComponent },
      { path: 'creation', component: CreationCompteComponent },
      {path:'historique',component:HistoriqueComponent},
     
      { path: 'tableau_de_bord', component: TableauDeBordComponent },
    ]
  },

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
