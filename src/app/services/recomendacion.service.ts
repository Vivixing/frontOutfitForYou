import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  constructor(private http:HttpClient) { }

  apiURLRecomendacion = `${URL_BASE_API_BACK}/recomendation`;

  async recomendacion(usuarioId: string, ocasion:string): Promise<any> {
    try{
      return await this.http.post<any>(`${this.apiURLRecomendacion}/generate_recomendation/${usuarioId}`, {ocasion}).toPromise();
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }
  async guardarRecomendacion(usuarioId: string, ocasion: string): Promise<any> {
    try {
      return await this.http.post<any>(`${this.apiURLRecomendacion}/save_recomendation/${usuarioId}`, {ocasion}).toPromise();
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }
}
