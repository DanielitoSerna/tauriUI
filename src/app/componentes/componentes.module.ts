import {NgModule} from '@angular/core';
import {LabelComponent} from './label/label.component'
import { AppAlertsComponent } from './app-alerts/app-alerts.component';
import { CancelarComponent } from './cancelar/cancelar.component';
import {PrimeModule} from "../primeNG/prime.module";
import { AgregarAlimentoComponent } from './agregar-alimento/agregar-alimento.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { MomentPipe } from './moment.pipe';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { InformacionComponent } from './informacion/informacion.component';
import { TerminosComponent } from './terminos/terminos.component';

@NgModule({
  declarations: [
    LabelComponent,
    AppAlertsComponent,
    CancelarComponent,
    AgregarAlimentoComponent,
    EliminarComponent,
    MomentPipe,
    EditarUsuarioComponent,
    InformacionComponent,
    TerminosComponent
  ],
  imports: [
    PrimeModule
  ],
  exports: [
    LabelComponent,
    AppAlertsComponent,
    CancelarComponent,
    AgregarAlimentoComponent,
    EliminarComponent,
    MomentPipe,
    EditarUsuarioComponent,
    InformacionComponent,
    TerminosComponent
  ],
  providers: [],
})
export class ComponentesModule {}
