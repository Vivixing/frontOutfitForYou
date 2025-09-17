import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';

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
      throw mensajeError;
    }
  }

  async obtenerTipoPorCategoria(tipoPrenda:string){
    try{
      const response: any = await this.http.get<any>(`${this.apiURLTipoPrenda}/get_by_category/${tipoPrenda}`).toPromise();
      return response;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async crearTipoPrenda(categoria:string){
    try{
      const body = {
       categoria
      };
      await this.http.post<any>(`${this.apiURLTipoPrenda}/create`, body).toPromise();
      
      //Obtener todos los tipoPrenda de esa categoría
      const response: any = await this.http.get<any>(`${this.apiURLTipoPrenda}/get_by_category/${categoria}`).toPromise();

      //Buscar el más reciente por fechaCreado
      const lista = response?.data || [];
      const tipoPrendaMasReciente = lista
        .filter((item: any) => item.fechaCreado) // Asegura que tenga fecha
        .sort((a: any, b: any) => new Date(b.fechaCreado).getTime() - new Date(a.fechaCreado).getTime())[0];

      return tipoPrendaMasReciente;
      
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
    
  }

  async editarTipoPrenda(id: string, update_tipoPrenda: any): Promise<any> {
    try {
      return await this.http.patch<any>(`${this.apiURLTipoPrenda}/update/${id}`, update_tipoPrenda).toPromise();
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }
}
