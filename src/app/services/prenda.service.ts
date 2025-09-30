import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  predictedName: string = '';
  imageBase64: string = '';
  color: string = '';

  private prendasSubject = new BehaviorSubject<any[]>([]);
  public prendas$ = this.prendasSubject.asObservable();

  constructor(private http:HttpClient) { }

  apiURLPrenda = `${URL_BASE_API_BACK}/clothe`;

  async predecirPrenda(imagen:string):Promise<any>{
    const formData = new FormData();
    const blob = this.base64ToBlob(imagen, 'image/jpeg');
    const file = new File([blob], 'imagen.jpg');

    formData.append('imagen', file);

    try{

      const response = await this.http.post<any>(`${this.apiURLPrenda}/predict_clothe`, formData).toPromise();

      this.predictedName = response.nombre_prenda_predicha;
      this.imageBase64 = response.imagen_base64;
      this.color = response.color;

      return response;

    }catch(error:any){

      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  private base64ToBlob(base64: string, mime: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    return new Blob([new Uint8Array(byteArrays)], { type: mime });
  }

  async registrarPrenda(prenda:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLPrenda}/create`, prenda).toPromise();
      return response;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async obtenerPrendasPorIdUsuario(user_id:string, reset = true):Promise<void>{
    if (reset) this.prendasSubject.next([]);
    try{
      const response:any = await this.http.get<any>(`${this.apiURLPrenda}/get_by_user/${user_id}`).toPromise();
      this.prendasSubject.next(response.data ?? []);
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async obtenerPrendasPorIdPrenda(id_prenda:string){
    try{
      const response = await this.http.get<any>(`${this.apiURLPrenda}/get_by_id/${id_prenda}`).toPromise();
      return response;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async editarPrenda(id:string, update_prenda:any):Promise<any>{
    try{
      return await this.http.patch<any>(`${this.apiURLPrenda}/update/${id}`, update_prenda).toPromise();
    }catch (error: any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async eliminarPrenda(prenda_id:string):Promise<any>{
    try{
      return await this.http.delete<any>(`${this.apiURLPrenda}/delete/${prenda_id}`).toPromise();
    }catch(error){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }
}
