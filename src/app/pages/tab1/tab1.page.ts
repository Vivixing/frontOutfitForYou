import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  private subs: Subscription[] = [];

  constructor(
    private visualizacionService: VisualizacionService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    // Suscribirse a cambios en el nombre del usuario
    this.subs.push(
      this.usuarioService.nombreUsuario$.subscribe(nombre => {
        this.nombre = nombre;
      })
    );

    // Suscribirse a cambios en las visualizaciones
    this.subs.push(
      this.visualizacionService.visualizaciones$.subscribe(data => {
        this.visualizaciones = data;
      })
    );
    this.cargarNombreUsuario();
    this.cargaVisualizacionUsuario();
  }

  async cargarNombreUsuario() {
    this.isLoading = true;
    try {
      await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async cargaVisualizacionUsuario(){
    this.isLoading = true;
    try {
      await this.visualizacionService.obtenerVisualizacionesPorUsuario(this.authService.idUsuarioLogueado(), true);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
