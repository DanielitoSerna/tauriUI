import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.services';
import { Router } from '@angular/router';


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
              private router: Router) {
    this.googleAuthSDK();
  }

  callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
        let profile = googleAuthUser.getBasicProfile();
        let nombre = profile.getName();
        this.nombreUsuario = profile.getEmail();
        this.nombre = nombre.substring(0, nombre.indexOf(" "));
        this.apellido = nombre.substring(nombre.indexOf(" ") + 1, nombre.length);
        this.correo = profile.getEmail();
        localStorage.setItem("nombreUsuario", profile.getName());
        localStorage.setItem("usuario", profile.getEmail());
        localStorage.setItem("nombre", this.nombre);
        localStorage.setItem("apellido", this.apellido);
        localStorage.setItem("tipoUsuario", "U");
        this.router.navigate(['/inicio']);
        window.location.reload();
      }, (error:any) => {
        console.error(JSON.stringify(error, undefined, 2));
      });
    }
     
  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '326021480668-thtspfp1j9k9l9jkhqhlvm7p17051elb.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
          plugin_name: "chat"
        });
        this.callLoginButton();
      });
    }
      
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
    
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
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
