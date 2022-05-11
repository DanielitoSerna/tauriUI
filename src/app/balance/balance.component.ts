import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Output() abriDescargar = new EventEmitter<any>();

  constructor(private service: AppService) { }

  ngOnInit() { }

  siguiente() {
    this.confirmar.emit();
  }

  anterior() {
    this.atras.emit();
  }

  guardar() {
    this.confirmar.emit();
  }

  descargar() {
    this.abriDescargar.emit();
  }
}
