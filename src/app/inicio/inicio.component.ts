import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  terminos = false;

  constructor(private service: AppService) {
    this.validarUsuario();
  }

  validarUsuario() {
    let correo = String(localStorage.getItem("usuario"));
    this.service.listarUsuario(correo).then(data => {
      let usuario:any = {}; 
      if(data.length == 0) {
        this.terminos = true;
      } else {
        localStorage.setItem("tipoUsuario", data[0].tipo);
      }
    })
  }
}
