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

@NgModule({
  declarations: [
    AppComponent,
    EntradasComponent,
    ReportesComponent,
    AlimnetosComponent,
    DietaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    ComponentesModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
