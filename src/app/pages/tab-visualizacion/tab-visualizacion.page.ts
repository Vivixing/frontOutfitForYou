import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VisualizacionService } from 'src/app/services/visualizacion.service';
import { RecomendacionService } from '../../services/recomendacion.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { procesarErrorHttp } from 'src/app/utils/error-handler';

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
    console.log("Ocasión en el tab visualización:", this.ocasion)

    const visualizacionData = this.localStorageService.getItem('visualizacionData');
    console.log("Visualización en el tab:", visualizacionData)

    if (visualizacionData?.persona) {

      const personaFile = this.base64ToFile(visualizacionData.persona, "persona.png");

      const prendasFiles = visualizacionData.prendas.map((p: any, i: number) => {
        const b64 = p.imagen.startsWith("data:") ? p.imagen : `data:image/png;base64,${p.imagen}`;
        return this.base64ToFile(b64, `prenda_${i}.png`);
      });

      if (personaFile && prendasFiles.length > 0) {
        this.visualizarOutfit(personaFile, prendasFiles);
      }
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async visualizarOutfit(person: File, garments: File[]) {
    const loading = await this.uiService.presentLoading('Generando Visualización...');
    this.error = null;
    try {
      const response = await this.visualizacionService.visualizacion(person, garments);
      this.imageBase64 = `data:image/png;base64,${response.image_base64}`;
    } catch (err: any) {
      this.error = err.message;
      this.uiService.showAlert('Error al generar la visualización')
    } finally {
      loading.dismiss();
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
        const imagen_visualizacion = visualizacionData.persona.replace(/^data:image\/\w+;base64,/, "");

        await this.favoritoService.agregarFavorito(usuarioId, vestuarioId);
        await this.guardarVisualizacion(usuarioId, vestuarioId, imagen_visualizacion);

        this.uiService.showSuccessAddClothe('Agregado a Favoritos');
        localStorage.clear();
        this.router.navigate(['tabs/tabs/tab2']);
      } catch (error: any) {
        console.error('Error al agregar a favoritos:', error);
        this.uiService.showAlert('Error al agregar a favoritos');
      }
    } catch (error: any) {
      console.error('Error al agregar a favoritos:', error);
      this.uiService.showAlert('Error al agregar a favoritos');
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
      const mensajeError = procesarErrorHttp(error);
      console.error('Error desde el front al guardar la recomendación:', mensajeError);
      this.uiService.showAlert(mensajeError);
    }
  }

  async guardarVisualizacion(usuarioId: string, vestuarioId: string, imagen_visualizacion: string) {
    try {
      await this.visualizacionService.guardarVisualizacion(usuarioId, vestuarioId, imagen_visualizacion);
    } catch (error: any) {
      const mensajeError = procesarErrorHttp(error);
      console.error('Error desde el front al guardar la visualización:', mensajeError);
      this.uiService.showAlert(mensajeError);
    }
  }
}

