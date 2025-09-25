import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { RecomendacionService } from '../../services/recomendacion.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { UiService } from 'src/app/services/ui.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-visualizacion',
  templateUrl: './tab-visualizacion.page.html',
  styleUrls: ['./tab-visualizacion.page.scss'],
  standalone: false,
})
export class TabVisualizacionPage implements OnInit {

  imageBase64: string | null = null;
  loading: boolean = false;
  ocasion: string = '';

  constructor(
    private visualizacionService: VisualizacionService,
    private localStorageService: LocalStorageService,
    private recomendacionService: RecomendacionService,
    private favoritoService: FavoritoService,
    private navCtrl: NavController,
    private uiService: UiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ocasion = this.localStorageService.getItem('ocasion');
    const visualizacionData = this.localStorageService.getItem('visualizacionData');

    if (visualizacionData?.persona) {
      // 👇 Procesar imágenes de manera diferida (no en el hilo inicial)
      setTimeout(() => {
        const personaFile = this.base64ToFile(visualizacionData.persona, "persona.png");

        const prendasFiles = visualizacionData.prendas.map((p: any, i: number) => {
          const b64 = p.imagen.startsWith("data:") ? p.imagen : `data:image/png;base64,${p.imagen}`;
          return this.base64ToFile(b64, `prenda_${i}.png`);
        });

        if (personaFile && prendasFiles.length > 0) {
          this.visualizarOutfit(personaFile, prendasFiles);
        }
      }, 0); // 👈 libera el main thread
    }
  }


  goBack() {
    this.navCtrl.back();
  }

  async visualizarOutfit(person: File, garments: File[]) {
    const loading = await this.uiService.presentLoading('Generando Visualización...');
    try {
      const response = await this.visualizacionService.visualizacion(person, garments);
      this.imageBase64 = `data:image/png;base64,${response.image_base64}`;
    } catch(error: any) {
      this.uiService.showAlert(error)
    } finally {
      loading.dismiss();
    }
  }

  base64ToFile(base64: string, filename: string): File {
    const [meta, data] = base64.split(',');
    const mime = meta.match(/:(.*?);/)?.[1] || "image/jpeg";
    const binary = atob(data);
    const u8arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }


  async agregarAFavoritos() {

    const loading = await this.uiService.presentLoading('Agregando a favoritos...');

    try {
      const visualizacionData = this.localStorageService.getItem('visualizacionData');

      if (!visualizacionData?.prendas[0]?.usuarioId?.id) {
        this.uiService.showAlert('No se encontró el ID de usuario');
        return;
      }

      const usuarioId = visualizacionData.prendas[0].usuarioId.id;
      await this.guardarRecomendacion(usuarioId, this.ocasion);

      try {
        const vestuarioId = this.localStorageService.getItem('vestuarioId');
        if (!vestuarioId) {
          this.uiService.showAlert('No se encontró el ID de vestuario');
          return;
        }

        if (!this.imageBase64) {
          this.uiService.showAlert('No se generó la visualización');
          return;
        }
        const imagen_visualizacion = this.imageBase64.replace(/^data:image\/\w+;base64,/, "");

        await this.favoritoService.agregarFavorito(usuarioId, vestuarioId);
        await this.guardarVisualizacion(usuarioId, vestuarioId, imagen_visualizacion);

        this.uiService.showSuccessAddClothe('Agregado a Favoritos');
        localStorage.clear();
        this.router.navigate(['tabs/tabs/tab2']);
      } catch (error: any) {
        this.uiService.showAlert(error);
      }
    } catch (error: any) {
      this.uiService.showAlert(error);
    } finally {
      loading.dismiss();
    }
  }

  async guardarRecomendacion(usuarioId: string, ocasion: string) {
    try {
      const response = await this.recomendacionService.guardarRecomendacion(usuarioId, ocasion);
      console.log('Respuesta al guardar la recomendación:', response);
      if (response?.data?.vestuarioId) {
        this.localStorageService.setItem('vestuarioId', response.data.vestuarioId);
      } else {
        this.uiService.showWarningMessage(`No vino vestuarioId en la respuesta del back: ${JSON.stringify(response)}`);
      }
    } catch (error: any) {
      this.uiService.showAlert(error);
    }
  }

  async guardarVisualizacion(usuarioId: string, vestuarioId: string, imagen_visualizacion: string) {
    try {
      await this.visualizacionService.guardarVisualizacion(usuarioId, vestuarioId, imagen_visualizacion);
    } catch (error: any) {
      this.uiService.showAlert(error);
    }
  }
}

