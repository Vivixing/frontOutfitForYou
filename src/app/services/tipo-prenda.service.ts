import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoPrendaService {

  constructor(private http:HttpClient) { }

  apiURLTipoPrenda = `${URL_BASE_API_BACK}/type_of_clothing`;

  async obtenerTodosLosTipos(){
    try{
      const response: any = await this.http.get<any>(`${this.apiURLTipoPrenda}/get_all`).toPromise();
      return response;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al obtener todos los tipo prendas', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async obtenerTipoPorCategoria(tipoPrenda:string){
    try{
      const response: any = await this.http.get<any>(`${this.apiURLTipoPrenda}/get_by_category/${tipoPrenda}`).toPromise();
      return response;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al obtener el tipo por categoría', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async crearTipoPrenda(tipoPrenda:string){
    try{
      const response: any = await this.http.post<any>(`${this.apiURLTipoPrenda}/create`, tipoPrenda).toPromise();
      return response; 
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al crear el tipoPrenda', mensajeError);
      throw new Error(mensajeError);
    }
    
  }
}
