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
      header: '✅ Agregado',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showSuccessDeleteFavorite(mensaje: string) {
    const alert = await this.alertController.create({
      header: '✅ Eliminado',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showSuccessPredictClothe(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡🔍 Prenda detectada!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showSuccessCreateRecomendation(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡💾 Guardada!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showWarningMessage(mensaje: string) {
    const alert = await this.alertController.create({
      header: '⚠️ Advertencia',
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSuccessWelcome(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡👋🏻 Bienvenido!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async confirmDeleteFavorite(): Promise<boolean>{
    return new Promise (async (resolve) => {
      const alert = await this.alertController.create({
        header : '¿Eliminar favorito?',
        message: '¿Quieres eliminar este vestuario de favoritos? ⚠️ Si lo eliminas, no se podrá recuperar este vestuario y tendrás que iniciar una nueva recomendación.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => resolve(false),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => resolve(true),
          }
        ]
      });
      await alert.present();
    });
  }

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: '❌ Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
