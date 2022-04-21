import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss']
})
export class DietaComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Input() alimentosSeleccionados:any[]  = [];
  @Input() alimentos: any[] = [];

  public text = '';
  public tipoAlerta = 'danger';

  constructor(private service: AppService) { }

  ngOnInit() {
    let alimentosS:any[] = this.alimentos;
    this.alimentos = [];
    this.alimentosSeleccionados.forEach(a => {
      let index = -1;
      if(alimentosS.length > 0){
        index = alimentosS.findIndex(x => x.alimento.id == a.id);
      }
      if(index == -1) {
        this.agregarAlimento(a);
      } else {
        this.alimentos.push(alimentosS[index]);
      }
    });
  }

  agregarAlimento(a: any) {
    this.alimentos.push({
      alimento: a
    });
  }

  siguiente() {

  }

  anterior() {
    this.text = '';
    this.atras.emit();
  }

  calcularCantidadO(item: any) {
    if(item.alimento.ms != undefined && item.cantidadKs != undefined) {   
        item.cantidadO = (item.cantidadKs / (item.alimento.ms / 100)).toFixed(2);   
    } else {
      item.cantidadO = 0;
      item.cantidadKs = 0;
    }

    this.confirmar.emit(this.alimentos);
  }

  calcularCantidadKs(item: any) {
    if(item.alimento.ms != undefined && item.cantidadO != undefined) {
      item.cantidadKs = ((item.alimento.ms / 100) * item.cantidadO).toFixed(2);
    } else {
      item.cantidadO = 0;
      item.cantidadKs = 0;
    }

    this.confirmar.emit(this.alimentos);
  }
}
