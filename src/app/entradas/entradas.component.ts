import {Component} from '@angular/core';
import { AppService } from '../app.services';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent {

  public text = "";
  public cancelar = false;

  public entrada: any = {
    manejo: 'confinamiento'
  };


  public activeIndex1 = 0;

  sourceProducts = [];
  targetProducts = [];

  alimentosSeleccionados = [];
  dieta = [];

  public states = [];
  public paises = [
    {nombre: "Colombia"}
  ];
  public razas = [
    {nombre: "Holstein"},
    {nombre: "Jersey"}
  ];
  public tipos = [
    {nombre: "Vaca lactante"},
    {nombre: "Vaca seca"}
  ];
  public tipografias = [
    {nombre: "Plana"},
    {nombre: "Ondulada"}
  ];

  public condiciones = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  public departamentos = [];
  public municipios = [];

  constructor(private service: AppService,
              private route: Router) {
    this.service.listarDepartamentos().then(data => this.departamentos = data);
    let reporte = sessionStorage.getItem("reporte");
    if(reporte != null && reporte != undefined) {
      this.service.initProgress();
      sessionStorage.removeItem("reporte");
      this.entrada = JSON.parse(reporte);
      this.service.listarMunicipios(this.entrada.departamentoDto).then(data => this.municipios = data);
      this.service.listarDieta(this.entrada.id).then(data => {
        this.service.finishProgress();
        this.dieta = data
      });
      let copia = sessionStorage.getItem("copia");
      sessionStorage.removeItem("copia");
      if(copia != null) {
        this.entrada.nombreReporte = null;
        this.entrada.id = null;
      }
    }
  }


  infoGeneralValida() : boolean {
    let valido = true;
    valido = this.entrada.nombreReporte != null;
    valido = valido ? this.entrada.pais != null : valido;
    valido = valido ? this.entrada.departamentoDto != null : valido;
    valido = valido ? this.entrada.municipioDto != null : valido;

    valido = valido ? this.entrada.raza != null : valido;
    valido = valido ? this.entrada.tipoAnimal != null : valido;
    valido = valido ? this.entrada.pesoCorporal != null : valido;
    valido = valido ? this.entrada.condicionCorporal != null : valido;
    valido = valido ? this.entrada.diasLeche != null : valido;
    valido = valido ? this.entrada.diasPrenez != null : valido;
    valido = valido ? this.entrada.numeroParto != null : valido;
    valido = valido ? this.entrada.intervaloParto != null : valido;

    valido = valido ? this.entrada.grasa != null : valido;
    valido = valido ? this.entrada.proteinaCruda != null : valido;
    valido = valido ? this.entrada.lactosa != null : valido;
    valido = valido ? this.entrada.precioVenta != null : valido;
    valido = valido ? this.entrada.produccionLeche != null : valido;
    valido = valido ? this.entrada.gananciaPeso != null : valido;

    if(this.entrada.manejo == 'pastoreo') {
      valido = valido ? this.entrada.distancia != null : valido;
      valido = valido ? this.entrada.numeroViajes != null : valido;
      valido = valido ? this.entrada.tipografia != null : valido;
    } else {
       this.entrada.distancia = undefined;
       this.entrada.numeroViajes = undefined;
       this.entrada.tipografia = undefined;
    }
    return valido
  }

  siguiente() {
    if(this.activeIndex1 == 0){
      if(this.infoGeneralValida()) {
        this.text = '';
        this.tabSiguiente();
      } else {
        this.text = 'Debe ingresar todos los datos del formulario para poder continuar, por favor verifique';
        document.getElementById("nombreReporte")?.focus();
      }
    }
  }

  tabSiguiente() {
    this.activeIndex1 = this.activeIndex1 + 1;
  }

  tabAnterior() {
    this.activeIndex1 = this.activeIndex1 - 1;
  }

  consultarMunicipios(event: any) {
    if(event.value != null) {
      this.service.listarMunicipios(event.value).then(data => this.municipios = data);
    }
  }

  confirmarAlimentos(event: any) {
    this.alimentosSeleccionados = event;
    this.tabSiguiente();
  }

  guardar(descargar: boolean) {
    this.service.initProgress();
    let editar = false;
    if(this.entrada.usuario != null){
      editar = true;
    }
    this.entrada.usuario = localStorage.getItem("usuario");
    this.entrada.fechaCreacion = new Date();
    this.service.guardarEntrada(this.entrada).then( data => {
      this.entrada = data;
      this.service.eliminarDieta(this.entrada.id).then(data => {
        this.dieta.forEach(a => {
          let dieta:any = {};
          let alimento: any = a['alimento'];
          dieta.idBiblioteca = alimento.id;
          dieta.idEntrada = this.entrada.id;
          dieta.cantidad = a['cantidad'];
          dieta.cantidadOfrecido = a['cantidadOfrecido'];
          dieta.precio = a['precio'];
          this.service.guardarDieta(dieta).then(data => {});
        });
        this.service.finishProgress();
        if(descargar) {
          window.open(this.service.configUrl + '/exportar?reporteId='+this.entrada.id);
        } else {
          if(editar) {
            sessionStorage.setItem("reporteEditado", JSON.stringify("si"));
          } else {
            sessionStorage.setItem("reporteGuardado", JSON.stringify("si"));
          }
          this.route.navigate(['/reportes']);
        }
      });
    });
  }
}
