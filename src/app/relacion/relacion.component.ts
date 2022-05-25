import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-relacion',
  templateUrl: './relacion.component.html',
  styleUrls: ['./relacion.component.scss']
})
export class RelacionComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Output() abriDescargar = new EventEmitter<any>();
  @Input() data: any;

  public relacion: any = {};


  constructor(private service: AppService) {  }

  ngOnInit() {
    this.service.relacionCostoBeneficio(this.data).then(data => {
      this.relacion = data;
    });
  }

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
    window.open(this.service.configUrl + '/exportar?reporteId=' + this.data.entradaDto.id);
  }

  getValor(value: number) {
    if(value != null) {
      return value.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else {
      return '-';
    }
  }
}
