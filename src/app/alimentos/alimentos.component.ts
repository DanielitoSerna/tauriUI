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
  @Input() dieta:any[]  = [];

  alimentoDto:any = {};
  alimentosDisponibles:any[] = [];
  alimentosDisponiblesT: any[] = [];

  public seleccionado = undefined;
  public agregar = false;
  public eliminar = false;
  public text = '';
  public tipoAlerta = '';
  public usuario:string = '';
  public categorias = [];
  public categoriaS = null;

  constructor(private service: AppService) {
    this.usuario = String(localStorage.getItem("usuario"));
    this.service.listarBiblioteca(this.usuario).then(data => {
      this.alimentosDisponibles = data;
      this.alimentosDisponiblesT = data;
      if(this.dieta != null && this.dieta.length > 0){
        this.dieta.forEach(d => {
          if(d.idBiblioteca != null) {
            let index = this.alimentosDisponibles.findIndex(x => x['id'] == d.idBiblioteca); 
            if(index > -1) {
              let alimento = this.alimentosDisponibles[index];
              this.alimentosDisponibles.splice(index, 1);
              this.alimentosDisponiblesT.splice(index, 1);
              this.alimentosSeleccionados.push(alimento);
            }
          }
        });
      }
    });
    this.service.listarCategorias().then(data => this.categorias = data);
  }

  verDetalle(event: any) {
    this.seleccionado = event.items[event.items.length -1];
  }

  obtenerValor(valor: any) {
    if(valor != null){
      return valor.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
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
          this.alimentosDisponiblesT[indexD] = event;
        } else {
          this.alimentosSeleccionados[indexS] = event;
        }
      } else if(indexD === -1) {
        this.text = "Se creo el alimento satisfactoriamente";
        this.alimentosDisponibles.push(event);
        this.alimentosDisponiblesT.push(event);
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
      let alimentosD: any[] = [];
      let alimentosS: any[] = [];
      this.alimentosDisponibles.forEach(x => {
        if(x.id != this.alimentoDto.id) {
          alimentosD.push(x);
        }
      });
      this.alimentosSeleccionados.forEach(x => {
        if(x.id != this.alimentoDto.id) {
          alimentosS.push(x);
        }
      });
      this.alimentosDisponibles = alimentosD;
      this.alimentosDisponiblesT = alimentosD;
      this.alimentosSeleccionados = alimentosS;
      this.text = 'Alimento eliminado satisfactoriamente';
      this.eliminar = false;
      this.alimentoDto = {};
    } else {
      this.eliminar = false;
      this.text = '';
      this.alimentoDto = {};
    }
  }

  filtrar() {
    if(this.alimentosDisponiblesT.length < this.alimentosDisponibles.length) {
      this.alimentosDisponiblesT = this.alimentosDisponibles;
    }
    if(this.categoriaS != null) {
      let result = this.alimentosDisponiblesT.filter(alimento => alimento.categoria == this.categoriaS);
      this.alimentosDisponibles = result;
    } else {
      this.alimentosDisponibles = this.alimentosDisponiblesT;
    }
  }
}
