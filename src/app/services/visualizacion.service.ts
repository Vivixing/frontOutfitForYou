import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualizacionService {

  constructor(private http:HttpClient) { }

  private visualizacionesSubject = new BehaviorSubject<any[]>([]);
  public visualizaciones$ = this.visualizacionesSubject.asObservable();

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

  async obtenerVisualizacionesPorUsuario(usuarioId:string, reset = true):Promise<void>{
    if (reset) this.visualizacionesSubject.next([]);
    try{
      const response:any = await this.http.get(`${this.apiURLVisualizacion}/user/${usuarioId}`).toPromise();
      this.visualizacionesSubject.next(response.data ?? []);
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    } 
    
  }
  
}
