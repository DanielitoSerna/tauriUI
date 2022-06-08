import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {PrimeModule} from "./primeNG/prime.module";
import {EntradasComponent} from "./entradas/entradas.component";
import {ReportesComponent} from './reportes/reportes.component'

import {ComponentesModule} from "./componentes/componentes.module";
import { AppService } from './app.services';
import { HttpClientModule } from '@angular/common/http';
import { AlimnetosComponent } from './alimentos/alimentos.component';
import { DietaComponent } from './dieta/dieta.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { BalanceComponent } from './balance/balance.component';
import { InicioComponent } from './inicio/inicio.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmisionComponent } from './emision/emision.component';
import { NgChartsModule } from 'ng2-charts';
import { RelacionComponent } from './relacion/relacion.component';


@NgModule({
  declarations: [
    AppComponent,
    EntradasComponent,
    ReportesComponent,
    AlimnetosComponent,
    DietaComponent,
    BibliotecaComponent,
    BalanceComponent,
    InicioComponent,
    UsuariosComponent,
    EmisionComponent,
    RelacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    ComponentesModule,
    HttpClientModule,
    SocialLoginModule,
    NgChartsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
