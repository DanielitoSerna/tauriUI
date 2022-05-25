import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntradasComponent} from "./entradas/entradas.component";
import {ReportesComponent} from "./reportes/reportes.component";
import {BibliotecaComponent} from "./biblioteca/biblioteca.component";
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'entradas',
    component: EntradasComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
