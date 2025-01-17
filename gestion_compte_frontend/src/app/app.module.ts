import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceComponent } from './features/service/service.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CreationCompteComponent } from './profile/creation-compte/creation-compte.component';
import { ConsultaionCompteComponent } from './profile/consultaion-compte/consultaion-compte.component';
import { TableauDeBordComponent } from './profile/tableau-de-bord/tableau-de-bord.component';
import { ProfileNavbarComponent } from './profile/profile-navbar/profile-navbar.component';
import { ModifierCompteComponent } from './profile/modifier-compte/modifier-compte.component';
import { DetailCompteComponent } from './profile/detail-compte/detail-compte.component';
import { HistoriqueComponent } from './profile/historique/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    ServiceComponent,
    LoginComponent,
    ProfileComponent,
    CreationCompteComponent,
    ConsultaionCompteComponent,
    TableauDeBordComponent,
    ProfileNavbarComponent,
    ModifierCompteComponent,
    DetailCompteComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
