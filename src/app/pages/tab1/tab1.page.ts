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
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.isLoading = true;
    try {
      const [name, visualizaciones] = await Promise.all([
        this.usuarioService.obtenerNombreUsuarioLogueado(this.authService),
        this.visualizacionService.obtenerVisualizacionesPorUsuario(this.authService.idUsuarioLogueado())
      ]);
      this.nombre = name;
      this.visualizaciones = visualizaciones.data;
    } catch (error: any) {
      this.uiService.showAlert(error);
    } finally {
      this.isLoading = false;
    }
  }



}
