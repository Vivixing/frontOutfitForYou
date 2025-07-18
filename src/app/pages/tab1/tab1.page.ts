import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  nombre: string = '';
  errorMensaje: string = '';

  constructor(private authService: AuthService,   private usuarioService: UsuarioService) {}
  
 async ngOnInit() {
    try {
      const idUsuario = this.authService.idUsuarioLogueado();
      console.log('ID del usuario logueado:', idUsuario);

      if (!idUsuario) {
        this.errorMensaje = 'No se encontró el ID del usuario.';
        console.error(this.errorMensaje);
        return;
      }

      const usuario = await this.usuarioService.obtenerUsuarioId(idUsuario);
      console.log('Datos del usuario:', usuario);

      if (usuario && usuario.data.nombre) {
        this.nombre = usuario.data.nombre;
      } else {
        this.errorMensaje = 'No se pudo obtener el nombre del usuario.';
        console.error(this.errorMensaje);
      }
    } catch (error: any) {
      this.errorMensaje = 'Error al obtener el usuario: ' + error.message;
      console.error('Error capturado:', error);
    }
  }

}
