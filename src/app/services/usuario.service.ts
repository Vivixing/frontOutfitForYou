import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private authService:AuthService){ }
  apiURLUsuario = `${URL_BASE_API_BACK}/users`;

  async obtenerNombreUsuarioLogueado(authService:AuthService):Promise<string>{
    try{
      const id = authService.idUsuarioLogueado();
      if (!id) throw new Error('ID no encontrado');

      const usuario = await this.obtenerUsuarioId(id);
      return usuario?.data?.nombre || 'Usuario';
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Error al obtener nombre del usuario logueado', mensajeError);
      return 'Usuario';
    }
  }

  async obtenerUsuarioId(user_id:string){
    try{
      const response = await this.http.get<any>(`${this.apiURLUsuario}/${user_id}`).toPromise();
      return response;
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al cargar usuario por id', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async inicioSesionUsuario(email:string, contrasena:string){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}/login`,{email,contrasena}).toPromise();
      return response;
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al iniciar sesión', mensajeError);
      throw new Error(mensajeError);
    }
  }

  async crearUsuario(usuario:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}/register`, usuario).toPromise();
      return response;
    } catch(error:any) {
      let mensajeError = procesarErrorHttp(error);
      console.error('Desde el front: Error al crear usuario', mensajeError);
      throw new Error(mensajeError);
    }
  }

}
