import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.scss']
})
export class AlimnetosComponent {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Input() alimentosSeleccionados:any[]  = [];

  alimentoDto:any = {};
  alimentosDisponibles:any[] = [];

  public seleccionado = undefined;
  public agregar = false;
  public eliminar = false;
  public text = '';
  public tipoAlerta = '';

  constructor(private service: AppService) {
    this.service.listarBiblioteca('usuario').then(data => this.alimentosDisponibles = data);
  }

  verDetalle(event: any) {
    this.seleccionado = event.items[event.items.length -1];
  }

  obtenerValor(valor: any) {
    if(valor != null){
      return valor;
    } else {
      return "-";
    }
  }

  siguiente() {
    if(this.alimentosSeleccionados.length == 0) {
      this.tipoAlerta = 'danger';
      this.text = "Debe seleccionar al menos un alimento para poder continual";
    } else {
      this.text = '';
      this.confirmar.emit(this.alimentosSeleccionados);
    }
  }

  anterior() {
    this.text = '';
    this.atras.emit();
  }

  agregarAlimento(event: any) {
    this.agregar = false;
    this.alimentoDto = {};
    if(event && event.id != null) {
      var indexD = this.alimentosDisponibles.findIndex(x => x['id'] == event['id']); 
      var indexS = this.alimentosSeleccionados.findIndex(x => x['id'] == event['id']); 
  
      this.tipoAlerta = 'success';
      if(indexD != -1 || indexS != -1) {
        this.text = "Se actualizo el alimento satisfactoriamente";
        if(indexS != -1) {
          this.alimentosDisponibles[indexD] = event;
        } else {
          this.alimentosSeleccionados[indexS] = event;
        }
      } else if(indexD === -1) {
        this.text = "Se creo el alimento satisfactoriamente";
        this.alimentosDisponibles.push(event);
      }
    }
  }

  editar(alimento: any) {
    this.text = '';
    this.agregar = true;
    this.alimentoDto = alimento;
  }

  eliminarAlimento(alimento: any) {
    this.text = '';
    this.eliminar = true;
    this.alimentoDto = alimento;
  }

  confirmarEliminar(event: any) {
    this.tipoAlerta = 'success';
    if(event != undefined) {
      var indexD = this.alimentosDisponibles.findIndex(x => x['id'] == this.alimentoDto.id); 
      var indexS = this.alimentosSeleccionados.findIndex(x => x['id'] == this.alimentoDto.id); 
      if(indexD > -1) {
        this.alimentosDisponibles.splice(indexD, 1);
      } else if(indexS > -1) {
        this.alimentosDisponibles.splice(indexS, 1);
      }
      this.text = 'Alimento eliminado satisfactoriamente';
      this.eliminar = false;
      this.alimentoDto = null;
    } else {
      this.eliminar = false;
      this.text = '';
      this.alimentoDto = {};
    }
  }
}
