import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  apiURLUsuario = `${URL_BASE_API_BACK}/users`;

  async obtenerUsuarioId(idUsuario:string){
    try{
      const response = await this.http.get<any>(`${this.apiURLUsuario}/${idUsuario}`).toPromise();
      return response;

    }catch (error){
      console.error('Desde el front: Error al cargar usuario', error);
    }
  }

  async inicioSesionUsuario(nombreUsuario:string, claveUsuario:string){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}/login`,{nombreUsuario,claveUsuario}).toPromise();
      return response;
    }catch (error){
      console.error('Desde el front: Error al iniciar sesión', error);
    }
  }

  async crearUsuario(usuario:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}`, usuario).toPromise();
      return response;
    } catch(error) {
      console.error('Desde el front: Error al Crear Usuario', error)
    }
  }

}
