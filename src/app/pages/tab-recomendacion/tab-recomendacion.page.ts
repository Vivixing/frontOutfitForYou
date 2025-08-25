import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab-recomendacion',
  templateUrl: './tab-recomendacion.page.html',
  styleUrls: ['./tab-recomendacion.page.scss'],
  standalone: false,
})
export class TabRecomendacionPage implements OnInit {

  vestuarioSugerido: any[] = [];
  imagenUsuario: string | null = null;

  constructor(private navCtrl: NavController, private localStorageService:LocalStorageService, private alertController: AlertController) { }

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() { 
    this.vestuarioSugerido = this.localStorageService.getItem('vestuarioSugerido');
    console.log('Vestuario recuperado', this.vestuarioSugerido);
  }

  seleccionarArchivo(event:any){
    const archivo: File = event.target.files[0];
    if(archivo){
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenUsuario = lector.result as string;
        console.log('Imagen cargada:',this.imagenUsuario);
      };
      lector.readAsDataURL(archivo);
    }else{
      this.showAlert('❌ Por favor selecciona un archivo de imagen válido')
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
