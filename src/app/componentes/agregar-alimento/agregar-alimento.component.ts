import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.services';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.scss']
})
export class AgregarAlimentoComponent implements OnInit {

  @Input() visible = true;
  @Output() change = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();
  @Input() bibliotecaDto:any = {};

  public categorias = [];
  public tipos = [];

  public text = '';

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.listarCategorias().then(data => this.categorias = data);
    this.service.listarTipoAlimentos().then(data => this.tipos = data);

  }

  guardar() {
    alert('paso a guardar');
    if(this.bibliotecaDto.tipo == null || this.bibliotecaDto.nombre == null || this.bibliotecaDto.categoria == null){
      this.text = 'Debe ingresar todos los datos del formulario marcados como requeridos para poder continuar, por favor verifique';
      document.getElementById("nombreAlimento")?.focus();
    } else {
      this.bibliotecaDto.usuario = "usuario";
      this.service.guardarAlimento(this.bibliotecaDto).then(data => {
        this.text = '';
        this.visible = false;
        this.change.emit(data);
      })
    }
  }
}
