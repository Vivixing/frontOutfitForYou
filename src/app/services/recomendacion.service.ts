import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  constructor(private http:HttpClient) { }

  apiURLPrenda = `${URL_BASE_API_BACK}/recomendation`;

  async recomendacion(recomendacion:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLPrenda}/recomendation_clothe`, recomendacion).toPromise();
      return response;
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al generar la recomendación', mensajeError);
      throw new Error(mensajeError);
    }
  }
}
