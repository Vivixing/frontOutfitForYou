import { procesarErrorHttp } from '../utils/error-handler';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(
    private http: HttpClient
  ) { }

  apiURLFavorito = `${URL_BASE_API_BACK}/favorite`;

  async agregarFavorito(usuarioId: string, vestuarioId: string): Promise<any> {
    try {
      const body = { usuarioId, vestuarioId };
      return await this.http.post(`${this.apiURLFavorito}/create`, body).toPromise();
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al agregar favorito', mensajeError);
      throw new Error(mensajeError);
    } 
  }

  async obtenerFavoritosPorUsuario(usuarioId: string): Promise<any> {
    try {
      return await this.http.get(`${this.apiURLFavorito}/${usuarioId}`).toPromise();
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al obtener favoritos', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async eliminarFavorito(favoritoId:string): Promise<any>{
    try{
      return await this.http.delete(`${this.apiURLFavorito}/delete/${favoritoId}`).toPromise();
    } catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al eliminar favorito', mensajeError);
      throw new Error(mensajeError);
    }
  }
}
