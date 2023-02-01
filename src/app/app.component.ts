import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.services';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tauri';

  //socialUser!: SocialUser;
  isLoggedin?: boolean = false;
  nombreUsuario:string = '';
  nombre:string = '';
  apellido:string = '';
  correo: string = '';
  tipo: string = 'U';
  informacion = false;

  @ViewChild('loginRef') loginElement!: ElementRef;
  auth2: any;

  constructor( public service: AppService,
              private router: Router,
              private authService: SocialAuthService) {
    this.googleAuthSDK();
  }

  callLoginButton() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
     
  googleAuthSDK() {
    this.authService.authState.subscribe((profile: any) => {
      let nombre = profile.name;
      this.nombreUsuario = profile.email;
      this.nombre = nombre.substring(0, nombre.indexOf(" "));
      this.apellido = nombre.substring(nombre.indexOf(" ") + 1, nombre.length);
      this.correo = profile.email;
      localStorage.setItem("nombreUsuario", nombre);
      localStorage.setItem("usuario", this.correo);
      localStorage.setItem("nombre", this.nombre);
      localStorage.setItem("apellido", this.apellido);
      localStorage.setItem("tipoUsuario", "U");
      this.router.navigate(['/inicio']);
      window.location.reload();
    }, (error:any) => {
      console.error(JSON.stringify(error, undefined, 2));
    });
  }

  ngOnInit() {
    this.isLoggedin = localStorage.getItem("nombreUsuario") != null && localStorage.getItem("usuario") != null;
    this.nombreUsuario = String(localStorage.getItem("nombreUsuario"));
    this.nombre = String(localStorage.getItem("nombre"));
    this.apellido = String(localStorage.getItem("apellido"));
    this.correo = String(localStorage.getItem("usuario"));
    this.tipo = String(localStorage.getItem("tipoUsuario"));
  }

  logOut(): void {
    this.authService.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
