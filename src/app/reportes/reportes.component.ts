import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  public customers = [];

  constructor(private router: Router) {}

  nuevoReporte() {
    this.router.navigate(['/entradas']);
  }
}
