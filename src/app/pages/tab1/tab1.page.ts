import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  isLoading: boolean = true;
  nombre: string = '';
  visualizaciones: any[] = [];

  constructor(
    private visualizacionService: VisualizacionService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter() {
    this.isLoading = true;
    try {
      this.nombre = await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
      const visualizaciones = await this.visualizacionService.obtenerVisualizacionesPorUsuario(this.authService.idUsuarioLogueado());
      this.visualizaciones = visualizaciones.data
    } catch (error: any) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }



}
