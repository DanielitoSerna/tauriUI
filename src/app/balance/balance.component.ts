import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Input() data: any;

  public balance: any = {};

  constructor(private service: AppService) {  }

  ngOnInit() { 
    this.service.calcularBalance(this.data).then(data => {
      this.balance = data;
    });
  }

  siguiente() {
    this.confirmar.emit();
  }

  anterior() {
    this.atras.emit();
  }

  obteneClaseValor(valor: number) {
    let clase = 'success';
    if(valor < -2.5) {
      clase = 'danger';
    } else if(valor > 2.5) {
      clase = 'warning';
    }
    return clase;
  }

  getValor(value: number) {
    if(value != null) {
      return value.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return '-';
    }
  }

  calcularForraje() {
    let suma = 0;
    let sumaForraje = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma = (suma + Number(alimento.cantidad));
      }
      if(alimento.cantidad != null && alimento.alimento.tipo == 'Forraje') {
        sumaForraje = (sumaForraje + Number(alimento.cantidad));
      }
    });
    if(sumaForraje > 0 ) {
      return (suma / sumaForraje * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularConcentrado() {
    let suma = 0;
    let sumaConcentrado = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma = (suma + Number(alimento.cantidad));
      }
      if(alimento.cantidad != null && alimento.alimento.tipo == 'Concentrado') {
        sumaConcentrado = (sumaConcentrado + Number(alimento.cantidad));
      }
    });
    if(sumaConcentrado > 0 ) {
      return (suma / sumaConcentrado * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularFdn() {
    let suma = 0;
    let sumaFdn = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma += Number(alimento.cantidad);
      }
      if(alimento.alimento.fdn != null && alimento.cantidad > 0) {
        sumaFdn += (Number(alimento.alimento.fdn) / Number(alimento.cantidad) * 100);
      }
    });
    if(suma > 0 ) {
      return (sumaFdn / suma * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularFda() {
    let suma = 0;
    let sumaFda = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma += Number(alimento.cantidad);
      }
      if(alimento.alimento.fda != null && alimento.cantidad > 0) {
        sumaFda += (Number(alimento.alimento.fda) / Number(alimento.cantidad) * 100);
      }
    });
    if(suma > 0 ) {
      return (sumaFda / suma * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularAlmidon() {
    let suma = 0;
    let sumaAlmidon = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma += Number(alimento.cantidad);
      }
      if(alimento.alimento.almidon != null && alimento.cantidad > 0) {
        sumaAlmidon += (Number(alimento.alimento.almidon) / Number(alimento.cantidad) * 100);
      }
    });
    if(suma > 0 ) {
      return (sumaAlmidon / suma * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularPb() {
    let suma = 0;
    let sumaPb = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma += Number(alimento.cantidad);
      }
      if(alimento.alimento.pb != null && alimento.cantidad > 0) {
        sumaPb += (Number(alimento.alimento.pb) / Number(alimento.cantidad) * 100 / 1000);
      }
    });
    sumaPb = sumaPb / 1000;
    if(suma > 0 ) {
      return (sumaPb / suma * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

  calcularPdr() {
    let suma = 0;
    let sumaPdr = 0;
    this.data.dietaDtos.forEach((alimento: any) => {
      if(alimento.cantidad != null) {
        suma += Number(alimento.cantidad);
      }
      if(alimento.alimento.pb != null && alimento.cantidad > 0) {
        sumaPdr += (Number(alimento.alimento.pb) / Number(alimento.cantidad) * 100 / 1000);
      }
    });
    sumaPdr = sumaPdr / 1000;
    if(suma > 0 ) {
      return (sumaPdr / suma * 100).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return (0).toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }
}
