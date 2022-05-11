import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.services';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  public usuarios = [];
  public text = '';
  public verEditar = false;
  public usuarioDto = {};

  constructor(private router: Router,
              private service: AppService) {
    this.listarUsuarios();
  }

  editar(usuario: any) {
    this.usuarioDto = usuario;
    this.verEditar = true;
  }

  confirmar() {
    this.text = 'Usuario actualizado de forma exitosa';
    this.verEditar = false;
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.service.initProgress();
    this.service.listarUsuarios().then(data => {
      this.usuarios = data;
      this.service.finishProgress();
    });
  }
}
