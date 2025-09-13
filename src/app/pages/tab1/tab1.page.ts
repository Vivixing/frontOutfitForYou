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

  constructor(
    private authService: AuthService, 
    private usuarioService: UsuarioService) {}
  
  async ngOnInit() {
    this.nombre = await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
  }

}
