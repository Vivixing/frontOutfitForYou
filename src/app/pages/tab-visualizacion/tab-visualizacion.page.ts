import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-visualizacion',
  templateUrl: './tab-visualizacion.page.html',
  styleUrls: ['./tab-visualizacion.page.scss'],
  standalone: false,
})
export class TabVisualizacionPage implements OnInit {

  imageBase64: string | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private navCtrl: NavController, 
    private visualizacionService:VisualizacionService, 
    private uiService: UiService, 
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

    const visualizacionData = this.localStorageService.getItem('visualizacionData');
    console.log("Visualización en el tab:", visualizacionData)

    if (visualizacionData?.persona) {

      const personaFile = this.base64ToFile(visualizacionData.persona, "persona.png");

      const prendasFiles = visualizacionData.prendas.map((p: any, i:number) => {
        const b64 = p.imagen.startsWith("data:") ? p.imagen : `data:image/png;base64,${p.imagen}`;
        return this.base64ToFile(b64,`prenda_${i}.png`);
      } );

      if (personaFile && prendasFiles.length > 0) {
        this.visualizarOutfit(personaFile, prendasFiles);
      }
    }
  }

  async visualizarOutfit(person:File, garments: File[]){
    this.loading = true;
    this.error = null;
    try{
      const response = await this.visualizacionService.visualizacion(person,garments);
      this.imageBase64 =`data:image/png;base64,${response.image_base64}`;
    }catch (err:any){
      this.error = err.message;
      this.uiService.showAlert('❌ Error al generar la visualización')
    } finally{
      this.loading = false;
    }
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg"; // detecta mime o usa jpeg
    const bstr = atob(arr.length > 1 ? arr[1] : arr[0]); // quita "data:image/...;base64," si existe
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  goBack() {
    this.navCtrl.back();
  }
}
