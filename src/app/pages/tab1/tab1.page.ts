import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
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
    private uiService: UiService
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.nombre = await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
    this.cargarVisualizaciones()
  }

  async cargarVisualizaciones() {
    this.isLoading = true;
    const loading = await this.uiService.presentLoading('Cargando visualizaciones...');
     try {
      const response = await this.visualizacionService.obtenerVisualizacionesPorUsuario(
        this.authService.idUsuarioLogueado()
      );
      this.visualizaciones = response.data;
    } catch (error) {
      console.error('Error al obtener visualizaciones:', error);
      this.uiService.showAlert('Error al cargar visualizaciones');
    } finally {
      loading.dismiss();
      this.isLoading = false;
    }
  }


}
