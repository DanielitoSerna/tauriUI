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
  public calculo: any = {};

  constructor(private service: AppService) {  }

  ngOnInit() { 
    this.service.calcularBalance(this.data).then(data => {
      this.balance = data;
    });

    this.service.calculoBalance(this.data).then(data => {
      this.calculo = data;
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
}
