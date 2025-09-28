import { procesarErrorHttp } from '../utils/error-handler';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private favoritosSubject = new BehaviorSubject<any[]>([]);
  public favoritos$ = this.favoritosSubject.asObservable();

  constructor(private http: HttpClient) { }

  apiURLFavorito = `${URL_BASE_API_BACK}/favorite`;

  async agregarFavorito(usuarioId: string, vestuarioId: string): Promise<any> {
    try {
      const body = { usuarioId, vestuarioId };
      return await this.http.post(`${this.apiURLFavorito}/create`, body).toPromise();
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    } 
  }

  async obtenerFavoritosPorUsuario(usuarioId: string, reset = true): Promise<void> {
    if (reset) this.favoritosSubject.next([]);
    try {
      const response:any = await this.http.get(`${this.apiURLFavorito}/${usuarioId}`).toPromise();
      this.favoritosSubject.next(response.data ?? []);
    } catch (error: any) {
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async eliminarFavorito(favoritoId:string): Promise<any>{
    try{
      return await this.http.delete(`${this.apiURLFavorito}/delete/${favoritoId}`).toPromise();
    } catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }
}
