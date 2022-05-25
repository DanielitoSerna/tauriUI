import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.services';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {

  @Input() visible = true;
  @Output() closed = new EventEmitter<any>();

  nombreUsuario:string = '';
  nombre:string = '';
  apellido:string = '';
  correo: string = '';
  tipo: string = 'U';

  constructor(private service: AppService,
              private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {}

  aceptar() {
    this.nombre = String(localStorage.getItem("nombre"));
    this.apellido = String(localStorage.getItem("apellido"));
    this.correo = String(localStorage.getItem("usuario"));
    this.tipo = String(localStorage.getItem("tipoUsuario"));

    let usuario:any = {}; 
    usuario.nombres = this.nombre;
    usuario.apellidos = this.apellido;
    usuario.correo = this.correo;
    usuario.fechaCreacion = new Date();
    usuario.tipo = 'U';

    usuario.fechaSesion = new Date();
    localStorage.setItem("tipoUsuario", usuario.tipo);
    this.tipo = usuario.tipo;
    this.service.guardarUsuario(usuario).then(data => {
      this.closed.emit();
    });
  }

  cancelar() {
    this.socialAuthService.signOut();
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    window.location.reload();
  }
}
