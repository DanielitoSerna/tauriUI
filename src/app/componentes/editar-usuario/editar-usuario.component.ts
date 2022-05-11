import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.services';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {

  @Input() visible = true;
  @Output() confirmar = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();
  @Input() usuario:any = {};

  tipos = [
    {name: "Adminitrador", value: "A"},
    {name: "Usuario", value: "U"}
  ]

  constructor(private service: AppService) {}

  cancelar() {
    this.usuario = {};
    this.visible = false;
    this.closed.emit();
  }

  guardar() {
    this.service.guardarUsuario(this.usuario).then(data => {
      this.confirmar.emit(this.usuario);
      this.visible = false;
    });
  }
}
