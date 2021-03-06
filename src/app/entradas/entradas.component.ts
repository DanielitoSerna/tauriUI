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
  public informacion = false;
  public tipo = "";

  public entrada: any = {
    manejo: 'confinamiento'
  };


  public activeIndex1 = 0;

  sourceProducts = [];
  targetProducts = [];

  alimentosSeleccionados = [];
  dieta = [];

  public states = [];
  public paises = [];

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

  public partos = [
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "Más de 2", value: 3}
  ];

  public condiciones = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  public departamentos = [];
  public municipios = [];

  constructor(private service: AppService,
              private route: Router) {
    this.service.listarPaises().then(data => this.paises = data);
    let reporte = sessionStorage.getItem("reporte");
    if(reporte != null && reporte != undefined) {
      this.service.initProgress();
      sessionStorage.removeItem("reporte");
      this.entrada = JSON.parse(reporte);
      if(this.entrada.departamento != null && this.entrada.departamento.pais != null) {
        this.service.listarDepartamentos(this.entrada.departamento.pais.id).then(data => this.departamentos = data);
        this.service.listarMunicipios(this.entrada.departamentoDto).then(data => this.municipios = data);
      }
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

    if(this.entrada.manejo == null) {
      this.entrada.manejo = 'confinamiento';
    }
  }


  infoGeneralValida() : boolean {
    let valido = true;
    valido = this.entrada.nombreReporte != null;
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
    if(this.activeIndex1 == 2) {
      this.guardar(true);
    } else {
      this.activeIndex1 = this.activeIndex1 + 1;
    }
   
  }

  tabAnterior() {
    this.activeIndex1 = this.activeIndex1 - 1;
  }

  consultarMunicipios(event: any) {
    if(event.value != null) {
      this.service.listarMunicipios(event.value).then(data => this.municipios = data);
    }
  }

  consultarDepartamentos(event: any) {
    this.municipios = [];
    if(event.value != null) {
      this.service.listarDepartamentos(event.value).then(data => this.departamentos = data);
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
          this.activeIndex1 = this.activeIndex1 + 1;
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

  abrirInfo(tipo: any) {
    this.tipo = tipo;
    this.informacion = true;
  }
}
