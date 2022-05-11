import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private service: AppService) {}
}
