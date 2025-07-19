import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  predictedName: string = '';
  imageBase64: string = '';

  constructor(private http:HttpClient) { }

  apiURLPrenda = `${URL_BASE_API_BACK}/clothe`;

  async predecirPrenda(imagen:File){

    const formData = new FormData();
    formData.append('imagen', imagen);

    try{

      const response = await this.http.post<any>(`${this.apiURLPrenda}/predict_name`, formData).toPromise();
      console.log('Predicción:', response);

      this.predictedName = response.nombre_prenda_predicha;
      this.imageBase64 = response.imagen_base64;

      return response;

    }catch(error:any){

      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al predecir nombre de la prenda', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async registrarPrenda(prenda:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLPrenda}/create`, prenda).toPromise();
      return response;
    }catch(error:any){

      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al crear la prenda', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async obtenerPrendasPorIdUsuario(user_id:string){
    try{
      const response = await this.http.get<any>(`${this.apiURLPrenda}/get_by_user/${user_id}`).toPromise();
      return response;
    }catch(error:any){

      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al obtener la prenda por id del usuario', mensajeError);
      throw new Error(mensajeError);

    }
  }
}
