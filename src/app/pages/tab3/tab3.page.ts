import { RecomendacionService } from '../../services/recomendacion.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { procesarErrorHttp } from '../../utils/error-handler';
import { AuthService } from '../../services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  ocasion: string = '';
  vestuarioSugerido: any[] = [];
  usuarioId: string = '';

  ngOnInit() {
    this.usuarioId = this.authService.idUsuarioLogueado();
    console.log('ID de usuario logueado:', this.usuarioId);
  }

  constructor(
    private navCtrl: NavController, 
    private authService: AuthService, 
    private recomendacionService: RecomendacionService, 
    private localStorageService:LocalStorageService , 
    private router: Router, 
    private uiService: UiService
  ) {}

  goBack() {
    this.navCtrl.back();
  }

   async generarRecomendacion() {

    if (!this.ocasion || this.ocasion.trim()===""){
      this.uiService.showAlert("Debes ingresar una ocasión antes de generar la recomendación");
      return;
    }

    try {
      this.vestuarioSugerido = await this.recomendacionService.recomendacion(this.usuarioId, this.ocasion);    
      console.log('Vestuario sugerido:', this.vestuarioSugerido);
      this.localStorageService.setItem('vestuarioSugerido', this.vestuarioSugerido);
      this.router.navigate(['/tabs/tabs/tabRecomendacion']);
    } catch (error: any) {
      const mensajeError = procesarErrorHttp(error);
      console.error('Error desde el front al generar la recomendación:', mensajeError);
      this.uiService.showAlert(mensajeError);
    }
  }

  async guardarRecomendacion() {
    try {
      await this.recomendacionService.guardarRecomendacion(this.usuarioId, this.ocasion);
      this.uiService.showSuccessCreateRecomendation('Recomendación guardada exitosamente');
    } catch (error: any) {
      const mensajeError = procesarErrorHttp(error);
      console.error('Error desde el front al guardar la recomendación:', mensajeError);
      this.uiService.showAlert(mensajeError);
    }
  }

}
