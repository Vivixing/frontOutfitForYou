import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API_BACK } from '../config/ur.api';
import { procesarErrorHttp } from '../utils/error-handler';
import { AuthService } from './auth.service';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private nombreUsuarioSubject = new BehaviorSubject<string>('');
  public nombreUsuario$ = this.nombreUsuarioSubject.asObservable();

  constructor(private http:HttpClient, private authService:AuthService){ }
  apiURLUsuario = `${URL_BASE_API_BACK}/users`;

  async obtenerNombreUsuarioLogueado(authService:AuthService):Promise<string>{
    try{
      const id = authService.idUsuarioLogueado();
      if (!id) throw new Error('ID no encontrado');

      const usuario = await this.obtenerUsuarioId(id);
      const nombre = usuario?.data?.nombre || 'Usuario';
      this.nombreUsuarioSubject.next(nombre);
      return nombre;
    }catch(error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async obtenerUsuarioId(user_id:string){
    try{
      const response = await this.http.get<any>(`${this.apiURLUsuario}/${user_id}`).toPromise();
      return response;
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async inicioSesionUsuario(email:string, contrasena:string){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}/login`,{email,contrasena}).toPromise();
      return response;
    }catch (error:any){
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

  async crearUsuario(usuario:any){
    try{
      const response = await this.http.post<any>(`${this.apiURLUsuario}/register`, usuario).toPromise();
      return response;
    } catch(error:any) {
      let mensajeError = procesarErrorHttp(error);
      throw mensajeError;
    }
  }

}
