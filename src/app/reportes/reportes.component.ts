import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.services';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  public resportes = [];
  public text = '';

  constructor(private router: Router,
              private service: AppService) {
    
    this.service.initProgress();
    this.service.listarEntradas(localStorage.getItem("usuario")).then(data => {
      this.resportes = data;
      this.service.finishProgress();
    });
    let reporteG = sessionStorage.getItem("reporteGuardado");
    let reporteE = sessionStorage.getItem("reporteEditado");
    if(reporteG != null) {
      sessionStorage.removeItem("reporteGuardado");
      this.text = 'Simulación creada satisfactoriamente'
    } else if(reporteE != null){
      sessionStorage.removeItem("reporteEditado");
      this.text = 'Simulación actualizada satisfactoriamente'
    } 
  }

  nuevoReporte() {
    this.router.navigate(['/entradas']);
  }

  editar(reporte: any) {
    sessionStorage.setItem("reporte", JSON.stringify(reporte));
    this.router.navigate(['/entradas']);
  }

  copia(reporte: any) {
    sessionStorage.setItem("reporte", JSON.stringify(reporte));
    sessionStorage.setItem("copia", JSON.stringify(reporte));
    this.router.navigate(['/entradas']);
  }

  descargar(reporte: any) {
    window.open(this.service.configUrl + '/exportar?reporteId='+reporte.id);
  }
}
