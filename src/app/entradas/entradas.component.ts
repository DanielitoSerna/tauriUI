import {Component} from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent {

  public text = "";
  public cancelar = false;

  public pais = undefined;
  public departamento = undefined;
  public municipio = undefined;
  public raza = undefined;
  public tipoAnimal = undefined;
  public tipografica = undefined;

  public nombreReporte = undefined;
  public peso = undefined;
  public condicion = undefined;
  public diasPrenez = undefined;
  public diasLecha = undefined;
  public numeroPartos = undefined;
  public intervaloPartos = undefined;
  public porGrasa = undefined;
  public porProteina = undefined;
  public porLactosa = undefined;
  public precioVenta = undefined;
  public manejo = 'confinamiento';
  public distanciaOrdeno = undefined;
  public numeroViajes = undefined;


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

  public departamentos = [];
  public municipios = [];

  constructor(private service: AppService) {
    this.service.listarDepartamentos().then(data => this.departamentos = data);
  }


  infoGeneralValida() : boolean{
    let valido = true;
/*     valido = this.nombreReporte != null;
    valido = valido ? this.pais != null : valido;
    valido = valido ? this.departamento != null : valido;
    valido = valido ? this.municipio != null : valido;

    valido = valido ? this.raza != null : valido;
    valido = valido ? this.tipoAnimal != null : valido;
    valido = valido ? this.peso != null : valido;
    valido = valido ? this.condicion != null : valido;
    valido = valido ? this.diasLecha != null : valido;
    valido = valido ? this.diasPrenez != null : valido;
    valido = valido ? this.numeroPartos != null : valido;
    valido = valido ? this.intervaloPartos != null : valido;

    valido = valido ? this.porGrasa != null : valido;
    valido = valido ? this.porProteina != null : valido;
    valido = valido ? this.porLactosa != null : valido;
    valido = valido ? this.precioVenta != null : valido;

    if(this.manejo == 'pastoreo') {
      valido = valido ? this.distanciaOrdeno != null : valido;
      valido = valido ? this.numeroViajes != null : valido;
      valido = valido ? this.tipografica != null : valido;
    } */
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
}
