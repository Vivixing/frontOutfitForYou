import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PrendaService } from 'src/app/services/prenda.service';
import { UiService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { TipoPrendaService } from 'src/app/services/tipo-prenda.service';

@Component({
  selector: 'app-tab-editar-prenda',
  templateUrl: './tab-editar-prenda.page.html',
  styleUrls: ['./tab-editar-prenda.page.scss'],
  standalone: false,
})
export class TabEditarPrendaPage implements OnInit {

  prendaId: string = '';
  prenda : any = {};
  prendaOriginal: any = {}; 

  constructor(
    private navCtrl: NavController,
    private prendaService: PrendaService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private tipoPrendaService: TipoPrendaService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.prendaId = params['id'];
        this.cargarPrenda(this.prendaId);
      }else {
      console.warn('No se recibió ningún id por query params');
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarPrenda(id: string) {
    const loading = await this.uiService.presentLoading('Cargando información de la prenda...')
    try {
      const prenda = await this.prendaService.obtenerPrendasPorIdPrenda(id);
      this.prenda = JSON.parse(JSON.stringify(prenda.data));
      this.prendaOriginal = JSON.parse(JSON.stringify(prenda.data));
    } catch (error:any) {
      this.uiService.showAlert(error); 
    }finally{
      loading.dismiss();
    }
  }

  async actualizarPrenda(prendaEditada: any) {

    const errorMsg = this.validarPrenda(prendaEditada);
    if (errorMsg) {
      this.uiService.showAlert(errorMsg);
      return;
    }

    const huboCambios = this.hayDiferencias(this.prendaOriginal, prendaEditada);

    if (!huboCambios) {
      this.uiService.showAlert('Debes modificar al menos un campo para actualizar.');
      return;
    }

    const loading = await this.uiService.presentLoading('Actualizando prenda...');
    try {
      if (this.prendaOriginal.tipoPrendaId?.categoria !== prendaEditada.tipoPrendaId?.categoria && prendaEditada.tipoPrendaId?.categoria !== null) {
        await this.tipoPrendaService.editarTipoPrenda(prendaEditada.tipoPrendaId.id, { categoria: prendaEditada.tipoPrendaId.categoria });
      }

      await this.prendaService.editarPrenda(this.prendaId, prendaEditada);
      this.uiService.showSuccessUpdateClothe('Prenda actualizada');
      this.navCtrl.back();

    } catch (error:any) {
      this.uiService.showAlert(error);
    } finally{
      loading.dismiss();
    }
  }

  validarPrenda(prendaEditada: any): string | null {
    if (!prendaEditada.tipoPrendaId?.categoria?.trim()) {
      return 'Debes escoger una categoría válida';
    }
    if (!prendaEditada.nombre?.trim()) {
      return 'El campo nombre prenda no puede estar vacío';
    }
    return null;
  }

  hayDiferencias(original: any, editada: any): boolean {
    return original.nombre !== editada.nombre || original.tipoPrendaId?.categoria !== editada.tipoPrendaId?.categoria;
  }

}
