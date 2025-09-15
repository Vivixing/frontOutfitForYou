import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VisualizacionService } from 'src/app/services/visualizacion.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  nombre: string = '';
  visualizaciones: any[] = [];

  constructor(
    private authService: AuthService, 
    private usuarioService: UsuarioService,
    private visualizacionService: VisualizacionService
  ) {}

  async ngOnInit() {
    this.nombre = await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
  }

  async ionViewWillEnter() {
    this.visualizacionService.obtenerVisualizacionesPorUsuario(this.authService.idUsuarioLogueado()).then(visualizaciones => {
      console.log('Visualizaciones del usuario:', visualizaciones);
      this.visualizaciones = visualizaciones.data;
    });
  }



}
