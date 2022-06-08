import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AppService } from '../app.services';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-emision',
  templateUrl: './emision.component.html',
  styleUrls: ['./emision.component.scss']
})
export class EmisionComponent implements OnInit {

  @Output() confirmar = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  @Output() info = new EventEmitter<any>();
  @Input() data: any;

  chartJs:any = Chart;
  plugin = [DatalabelsPlugin]; 

  public emision: any = {};

  private labels = ['Fermentación entérica','Excretas en orina','Excretas en heces'];
  private color = [ "#137598", "#ef434d", "#f9a12c" ];
  private hover = [ "#037199", "#F02B36", "#FA950E"];
  public datosGrafica1 = {};
  public datosGrafica2 = {};
  public datosGrafica3 = {};
  public datosGrafica4 = {};

  options = {
    plugins: {
     datalabels: {
       formatter: (value:any, ctx: any) => {
         let sum = 0;
         const dataArr = ctx.chart.data.datasets[0].data;
         dataArr.map((data:any) => {
               sum += data;
         });
         const percentage = (value * 100 / sum); 
         return percentage !== 0 ? percentage.toFixed(2) + '%' : '';
       },
       color: '#fff',
     },
     tooltip: {
      callbacks: {
        title: function(context: any) {
          return context[0].label;
        },
        label: function(context: any) {
          return context.parsed.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " (kg/animal/año)";
        },
        afterLabel: function(context: any) {
          let sum = 0;
          const dataArr = context.chart.data.datasets[0].data;
          dataArr.map((data:any) => {
                sum += data;
          });
          const percentage = (context.parsed * 100 / sum); 
          return percentage !== 0 ? percentage.toFixed(2) + '%' : '';
        }
      }
     }
    },
    responsive: true,
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Chart.js Doughnut Chart'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }

  constructor(private service: AppService) {  }

  ngOnInit() {
    this.service.calcularEmision(this.data).then(data => {
      this.emision = data;
      this.datosGrafica1 = {
        labels: this.labels,
        datasets: [ 
          {
            data: [
              this.emision.metanoFactorEmision, 
              this.emision.emisionMetanoAnioProduccionUrinaria, 
              this.emision.emisionMetanoAnioProduccionFecal
            ],
            backgroundColor: this.color,
            hoverBackgroundColor: this.hover
          }
        ]
      };
      this.datosGrafica2 = {
        labels: this.labels,
        datasets: [ 
          {
            data: [
              this.emision.dioxidoCarbonoFactorEmision, 
              this.emision.emisionCo2anioUrinaria, 
              this.emision.emisionCo2anioFecal
            ],
            backgroundColor: this.color,
            hoverBackgroundColor: this.hover
          }
        ]
      };
      this.datosGrafica3 = {
        labels: ['Excretas en orina','Excretas en heces'],
        datasets: [ 
          {
            data: [
              this.emision.emisionN2oAnioUrinario, 
              this.emision.emisionN2oAnioFecal
            ],
            backgroundColor: [ "#ef434d", "#f9a12c" ],
            hoverBackgroundColor: [ "#F02B36", "#FA950E" ]
          }
        ]
      };
      this.datosGrafica4 = {
        labels: this.labels,
        datasets: [ 
          {
            data: [
              this.emision.dioxidoCarbonoEqFactorEmision, 
              this.emision.emisionCo2EqAnioUrinario, 
              this.emision.emisionCo2EqAnioFecal
            ],
            backgroundColor: this.color,
            hoverBackgroundColor: this.hover
          }
        ]
      };
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

  abrirInfo(tipo: any) {
    this.info.emit(tipo);
  }
}
