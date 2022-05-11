import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.services';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {

  public alimentos = [];
  public agregar = false;
  public eliminar = false;
  public text = '';

  public alimentoDto:any = {};
  constructor(private service: AppService) {
    this.listar();
  }

  agregarAlimento(event: any) {
    this.agregar = false;
    if(event && event.id != null && event.id == this.alimentoDto.id) {
      this.listar();
      this.text = "Se actualizo el alimento satisfactoriamente";
    } else {
      this.listar();
      this.text = "Se creo el alimento satisfactoriamente";
    }
    this.alimentoDto = {};
  }

  confirmarEliminar(event: any) {
    if(event != undefined) {
      this.text = 'Alimento eliminado satisfactoriamente';
      this.eliminar = false;
      this.alimentoDto = {};
      this.listar();
    } else {
      this.eliminar = false;
      this.text = '';
      this.alimentoDto = {};
    }
  }

  editar(alimento: any) {
    this.text = '';
    this.agregar = true;
    this.alimentoDto = alimento;
  }

  copia(alimento: any) {
    this.text = '';
    this.alimentoDto = alimento;
    this.alimentoDto.id = null;
    this.agregar = true;
  }

  eliminarAlimento(alimento: any) {
    this.text = '';
    this.eliminar = true;
    this.alimentoDto = alimento;
  }

  listar() {
    this.service.initProgress();
    this.service.listarAlimentos().then(data => {
      this.alimentos = data;
      this.service.finishProgress();
    });
  }
}
