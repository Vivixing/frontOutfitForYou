import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-recomendacion',
  templateUrl: './tab-recomendacion.page.html',
  styleUrls: ['./tab-recomendacion.page.scss'],
  standalone: false,
})
export class TabRecomendacionPage implements OnInit {

  vestuarioSugerido: any[] = [];
  imagenUsuario: string | null = null;

  constructor(
    private navCtrl: NavController, 
    private localStorageService:LocalStorageService, 
    private uiService: UiService
  ) { }

  ngOnInit() { 
    this.vestuarioSugerido = this.localStorageService.getItem('vestuarioSugerido');
    console.log('Vestuario recuperado', this.vestuarioSugerido);
  }

  goBack() {
    this.navCtrl.back();
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
      this.uiService.showAlert('❌ Por favor selecciona un archivo de imagen válido')
    }
  }

}
