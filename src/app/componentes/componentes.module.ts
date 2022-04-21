import {NgModule} from '@angular/core';
import {LabelComponent} from './label/label.component'
import { AppAlertsComponent } from './app-alerts/app-alerts.component';
import { CancelarComponent } from './cancelar/cancelar.component';
import {PrimeModule} from "../primeNG/prime.module";
import { AgregarAlimentoComponent } from './agregar-alimento/agregar-alimento.component';
import { EliminarComponent } from './eliminar/eliminar.component';

@NgModule({
  declarations: [
    LabelComponent,
    AppAlertsComponent,
    CancelarComponent,
    AgregarAlimentoComponent,
    EliminarComponent
  ],
  imports: [
    PrimeModule
  ],
  exports: [
    LabelComponent,
    AppAlertsComponent,
    CancelarComponent,
    AgregarAlimentoComponent,
    EliminarComponent
  ],
  providers: [],
})
export class ComponentesModule {}
