import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public configUrl = "http://localhost:8080/api";
    constructor(private http: HttpClient) {}

    isProgress(): boolean {
        return localStorage.getItem('cargando') != null && localStorage.getItem('cargando') != undefined;
    }

    initProgress() {
        localStorage.setItem('cargando', 'true');
    }

    finishProgress() {
        localStorage.removeItem('cargando');
    }
    
    listarDepartamentos(): Promise<any>{
        return this.http.get(`${this.configUrl}/departamentos`).toPromise();
    }

    listarMunicipios(id: string): Promise<any>{
        return this.http.get(`${this.configUrl}/municipios?idDepartamento=` + id).toPromise();
    }

    listarBiblioteca(usuario: string): Promise<any>{
        return this.http.get(`${this.configUrl}/listarBiblioteca?usuario=` + usuario).toPromise();
    }

    listarCategorias(): Promise<any>{
        return this.http.get(`${this.configUrl}/listarCategorias`).toPromise();
    }

    listarTipoAlimentos(): Promise<any>{
        return this.http.get(`${this.configUrl}/listarTipoAlimentos`).toPromise();
    }

    guardarAlimento(biblioteca: any): Promise<any>{
        return this.http.post(`${this.configUrl}/guardarBiblioteca`, biblioteca).toPromise();
    }

    eliminarBiblioteca(id: any): Promise<any>{
        let body = new HttpParams();
        body.set('id', id);
        return this.http.post(`${this.configUrl}/eliminarBiblioteca?id=`+id, body).toPromise();
    }

    listarAlimentos(): Promise<any>{
        return this.http.get(`${this.configUrl}/listarTodosBiblioteca`).toPromise();
    }

    guardarEntrada(entradas: any): Promise<any>{
        return this.http.post(`${this.configUrl}/guardarEntrada`, entradas).toPromise();
    }

    guardarDieta(dieta: any): Promise<any>{
        return this.http.post(`${this.configUrl}/guardarDieta`, dieta).toPromise();
    }

    listarEntradas(usuario: any): Promise<any>{
        return this.http.get(`${this.configUrl}/entradas?usuario=` + usuario).toPromise();
    }

    listarDieta(id: string): Promise<any>{
        return this.http.get(`${this.configUrl}/dietas?idEntrada=` + id).toPromise();
    }

    eliminarDieta(id: any): Promise<any>{
        let body = new HttpParams();
        body.set('id', id);
        return this.http.post(`${this.configUrl}/eliminarDieta?idEntrada=`+id, body, {responseType: 'text'}).toPromise();
    }

    listarUsuarios(): Promise<any>{
        return this.http.get(`${this.configUrl}/listarUsuarios`).toPromise();
    }

    listarUsuario(usuario: any): Promise<any>{
        return this.http.get(`${this.configUrl}/listarUsuario?usuario=` + usuario).toPromise();
    }

    guardarUsuario(usuario: any): Promise<any>{
        return this.http.post(`${this.configUrl}/guardarUsuario`, usuario).toPromise();
    }
}