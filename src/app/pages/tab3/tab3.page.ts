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

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private recomendacionService: RecomendacionService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.usuarioId = this.authService.idUsuarioLogueado();
  }

  goBack() {
    this.navCtrl.back();
  }

  async generarRecomendacion() {

    if (!this.ocasion || this.ocasion.trim() === "") {
      this.uiService.showAlert("Debes ingresar una ocasión antes de generar la recomendación");
      return;
    }

    const loading = await this.uiService.presentLoading('Generando una recomendación...');

    try {
      this.localStorageService.setItem('ocasion', this.ocasion);
      this.vestuarioSugerido = await this.recomendacionService.recomendacion(this.usuarioId, this.ocasion);
      
      this.localStorageService.setItem('vestuarioSugerido', this.vestuarioSugerido);
      this.router.navigate(['/tabs/tabs/tabRecomendacion']);

    } catch (error:any) {
      this.uiService.showAlert(error);
    }finally {
      loading.dismiss(); 
    }
  }

}
