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
      formData.append('person', personFile); // archivo de la persona

      garmentFiles.forEach((file, index) => {
        formData.append('garment', file); // varios archivos
      });

      return await this.http.post(`${this.apiURLVisualizacion}/tryon`,formData).toPromise();
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al generar la visualización', mensajeError);
      throw new Error(mensajeError);
    }

  }
}
