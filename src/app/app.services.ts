import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    configUrl = "http://localhost:8080/api";
    constructor(private http: HttpClient) {}
    
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
}