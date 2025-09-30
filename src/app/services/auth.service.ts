import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogueado = false;
  private idUsuario = '';

  constructor(private storage: Storage, private router: Router) { 
    this.iniciar();
  }

  async iniciar() {
    await this.storage.create();
    this.idUsuario = await this.storage.get('idUsuario');
  }

  async esLogueado(): Promise<boolean> {
    this.idUsuario = await  this.storage.get('idUsuario')
    this.usuarioLogueado = this.idUsuario ? true : false;
    return this.usuarioLogueado;
  }

  idUsuarioLogueado(): string {
    return this.idUsuario;
  }

  async login(idUser:string){
    this.usuarioLogueado = true;
    this.idUsuario = idUser;
    await this.storage.set('idUsuario', idUser);
  }

  logout(): void {
    this.usuarioLogueado = false;
    this.idUsuario = '';
    this.storage.remove('idUsuario');
    this.router.navigate(['/login']);
  }
}
