import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController) {  
  }

  async presentLoading(message: string = 'Procesando...') {
    const loading = await this.loadingController.create({
      message,
      spinner: 'circles',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }

  async showSuccessAddClothe(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Agregado!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showSuccessCreateRecomendation(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Guardada!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

   async showSuccessWelcome(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
