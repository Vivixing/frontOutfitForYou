import { PrendaService } from 'src/app/services/prenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-closet',
  templateUrl: './tab-closet.page.html',
  styleUrls: ['./tab-closet.page.scss'],
  standalone: false
})
export class TabClosetPage implements OnInit {

  prendas: any[] = [];
  prendasFiltradas: any[] = [];
  isLoading: boolean = true;
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private prendaService: PrendaService,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    // Suscribirse a cambios en los favoritos
    this.subs.push(
      this.prendaService.prendas$.subscribe(data => {
        this.prendas = data.filter((f: any) => f.estado === true);
        this.prendasFiltradas = [...this.prendas];
      })
    );
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.cargarPrendas();
  }

  async cargarPrendas() {

    this.isLoading = true;
    const usuarioId = this.authService.idUsuarioLogueado();

    if (!usuarioId) {
      this.uiService.showAlert('No se encontró el id del usuario')
    }
    try {
      await this.prendaService.obtenerPrendasPorIdUsuario(usuarioId);
    } catch (error: any) {
      //this.uiService.showAlert(error)
    } finally {
      //loading.dismiss();
      this.isLoading = false;
    }
  }

  async eliminarPrenda(prendaId: string) {
    const confirm = await this.uiService.confirmDeleteClothe();
    if (!confirm) return;
    try {
      await this.prendaService.eliminarPrenda(prendaId);
      this.prendas = this.prendas.filter(prenda => prenda._id !== prendaId);
      this.prendasFiltradas = this.prendasFiltradas.filter(prenda => prenda._id !== prendaId);
      this.uiService.showSuccessDelete('Prenda eliminada correctamente');
    } catch (error: any) {
      this.uiService.showAlert(error);
    }
  }

  aplicarFiltroCategoria(categoria?: string) {
    console.log('Categoría seleccionada:', categoria);
    if (!categoria) {
      this.prendasFiltradas = [...this.prendas];
    } else {
      this.prendasFiltradas = this.filtrarPrendasPorCategoria(categoria);
    }
  }

  filtrarPrendasPorCategoria(categoria: string) {
    const response = this.prendas.filter(prenda => prenda.tipoPrendaId?.categoria === categoria);
    return response
  }

  irAtabAgregarPrenda() {
    this.router.navigate(['/tabs/tabs/tabAgregarPrenda']);
  }
}
