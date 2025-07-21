import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PrendaService } from 'src/app/services/prenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-closet',
  templateUrl: './tab-closet.page.html',
  styleUrls: ['./tab-closet.page.scss'],
  standalone: false
})
export class TabClosetPage implements OnInit {

  prendas: any[] = [];

  constructor(private router: Router, private navCtrl: NavController, private prendaService: PrendaService, private authService:AuthService,  private alertController: AlertController) { }

  ngOnInit() {
    this.cargarPrendas();
  }

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarPrendas(){
    const usuarioId = this.authService.idUsuarioLogueado();
    console.log('Usuario obtenido por ID', usuarioId);
    if(!usuarioId) {
      this.showAlert('No se encontró el id del usuario')
    }

    try{
      const response = await this.prendaService.obtenerPrendasPorIdUsuario(usuarioId);
      this.prendas = response.data;
      console.log("Lista de prendas por Id usuario", this.prendas);
    }catch(error){
      console.error('Error al cargar prendas:', error);
    }

  }

  irAtabAgregarPrenda(){
    this.router.navigate(['/tabs/tabs/tabAgregarPrenda']);
  }
}
