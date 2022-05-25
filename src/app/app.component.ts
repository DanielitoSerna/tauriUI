import { Component, OnInit } from '@angular/core';
import {SocialAuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import { AppService } from './app.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tauri';

  socialUser!: SocialUser;
  isLoggedin?: boolean = false;
  nombreUsuario:string = '';
  nombre:string = '';
  apellido:string = '';
  correo: string = '';
  tipo: string = 'U';

  constructor(
    private socialAuthService: SocialAuthService,
    public service: AppService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.isLoggedin = localStorage.getItem("nombreUsuario") != null && localStorage.getItem("usuario") != null;
    this.nombreUsuario = String(localStorage.getItem("nombreUsuario"));
    this.nombre = String(localStorage.getItem("nombre"));
    this.apellido = String(localStorage.getItem("apellido"));
    this.correo = String(localStorage.getItem("usuario"));
    this.tipo = String(localStorage.getItem("tipoUsuario"));
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      if(this.isLoggedin) {
        this.nombreUsuario = this.socialUser.name;
        this.nombre = this.socialUser.firstName;
        this.apellido = this.socialUser.lastName;
        this.correo = this.socialUser.email;
        localStorage.setItem("nombreUsuario", this.socialUser.name);
        localStorage.setItem("usuario", this.socialUser.email);
        localStorage.setItem("nombre", this.socialUser.firstName);
        localStorage.setItem("apellido", this.socialUser.lastName);
        localStorage.setItem("tipoUsuario", "U");
        this.router.navigate(['/inicio']);
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  logOut(): void {
    this.socialAuthService.signOut();
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    window.location.reload();
  }
}
