import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss']
})
export class DietaComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() continuar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Output() info = new EventEmitter<any>();
  @Input() alimentosSeleccionados:any[]  = [];
  @Input() alimentos: any[] = [];
  @Input() entradas: any[] = [];

  public text = '';
  public tipoAlerta = 'danger';
  public consumo:any = {};

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.consumoMateriaSecaPredicho(this.entradas).then(data => this.consumo = data);
    let alimentosS:any[] = this.alimentos;
    this.alimentos = [];
    this.alimentosSeleccionados.forEach(a => {
      let index = -1;
      if(alimentosS.length > 0){
        index = alimentosS.findIndex(x => x.alimento?.id == a.id || x.idBiblioteca == a.id);
      }
      if(index == -1) {
        this.agregarAlimento(a);
      } else {
        let dieta = alimentosS[index];
        dieta.idBiblioteca = a.id;
        dieta.alimento = a;
        this.calcularPrecioOfrecido(dieta);
        this.alimentos.push(dieta);
      }
    });
  }

  agregarAlimento(a: any) {
    this.alimentos.push({
      alimento: a,
      idBiblioteca: a.id
    });
  }

  siguiente() {
    this.text = '';
    let valido = true;
    this.alimentos.forEach(a => {
      if(a.cantidad == null || a.cantidadOfrecido == null || a.precio == null) {
        valido = false;
      }
    });
    if(valido) {
      this.continuar.emit();
    } else {
      this.text = 'Debe ingresar todos los datos de la dieta para poder continuar, por favor verifique';
    }
  }

  anterior() {
    this.text = '';
    this.atras.emit();
  }

  calcularCantidadO(item: any) {
    if(item.alimento.ms != undefined && item.cantidad != undefined) {   
        item.cantidadOfrecido = (item.cantidad / (item.alimento.ms / 100)).toFixed(2);   
    } else {
      item.cantidadOfrecido = 0;
      item.cantidad = 0;
    }

    this.confirmar.emit(this.alimentos);
  }

  calcularCantidadKs(item: any) {
    if(item.alimento.ms != undefined && item.cantidadOfrecido != undefined) {
      item.cantidad = ((item.alimento.ms / 100) * item.cantidadOfrecido).toFixed(2);
    } else {
      item.cantidadOfrecido = 0;
      item.cantidad = 0;
    }

    this.confirmar.emit(this.alimentos);
  }

  sumaSact() {
    let suma = 0;
    this.alimentos.forEach(alimento => {
      if(alimento.cantidad != null) {
        suma = (suma + Number(alimento.cantidad));
      }
    });
    return suma.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  sumaForraje() {
    let suma = 0;
    this.alimentos.forEach(alimento => {
      if(alimento.cantidad != null && alimento.alimento.tipo == 'Forraje') {
        suma = (suma + Number(alimento.cantidad));
      }
    });
    return suma.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  sumaConcentrado() {
    let suma = 0;
    this.alimentos.forEach(alimento => {
      if(alimento.cantidad != null && alimento.alimento.tipo == 'Concentrado') {
        suma = (suma + Number(alimento.cantidad));
      }
    });
    return suma.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  sumaPrecio() {
    let suma = 0;
    let sumaSact = 0;
    this.alimentos.forEach(alimento => {
      if(alimento.cantidad != null && alimento.precio != null) {
        suma = suma + (Number(alimento.cantidad) * Number(alimento.precio));
        sumaSact = (sumaSact + Number(alimento.cantidad));
      }
    });
    return (Number(suma) / Number(sumaSact)).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  calcularPrecio(item: any) {
    if(item.alimento.ms != undefined && item.precioOf != undefined) {
      item.precio = (item.precioOf / (item.alimento.ms / 100)).toFixed(2);
    } else if(item.alimento.ms == undefined){
      item.precio = 0;
      item.precioOf = 0;
    }
  }

  calcularPrecioOfrecido(item: any) {
    if(item.alimento.ms != undefined && item.precio != undefined) {
      item.precioOf = (item.precio * (item.alimento.ms / 100)).toFixed(2);
    } else if(item.alimento.ms == undefined) {
      item.precio = 0;
      item.precioOf = 0;
    }
  }

  getValor(value: number) {
    if(value != null) {
      return value.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return '-';
    }
  }

  abrirInfo(tipo: any) {
    this.info.emit(tipo);
  }

}
