import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntradasComponent} from "./entradas/entradas.component";
import {ReportesComponent} from "./reportes/reportes.component";


const routes: Routes = [
  {
    path: 'entradas',
    component: EntradasComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
