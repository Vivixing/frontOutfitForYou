import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class VisualizacionService {

  constructor(private http:HttpClient) { }

  apiURLVisualizacion = `${URL_BASE_API_BACK}/display`;

  async visualizacion(personFile:File, garmentFiles:File[]):Promise<any>{
    try{
      const formData = new FormData();
      formData.append('person', personFile);

      garmentFiles.forEach((file, index) => {
        formData.append('garment', file);
      });

      return await this.http.post(`${this.apiURLVisualizacion}/tryon`,formData).toPromise();
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }

  }

  async guardarVisualizacion(usuarioId:string, vestuarioId:string, imagen_visualizacion:string):Promise<any>{
    try{
      const body = { usuarioId, vestuarioId, imagen_visualizacion };
      return await this.http.post(`${this.apiURLVisualizacion}/create`, body).toPromise();
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async obtenerVisualizacionesPorUsuario(usuarioId:string):Promise<any>{
    try{
      return await this.http.get(`${this.apiURLVisualizacion}/user/${usuarioId}`).toPromise();
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    } 
  }
  
}
