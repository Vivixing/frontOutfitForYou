import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  favoritos: any[] = [];
  usuarioId: string = '';
  isLoading: boolean = true;
  subs: Subscription[] = [];

  constructor(
    private navCtrl: NavController,
    private favoritoService: FavoritoService,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    // Suscribirse a cambios en los favoritos
    this.subs.push(
      this.favoritoService.favoritos$.subscribe(data => {
        this.favoritos = data.filter((f: any) => f.estado === true);
      })
    );
  }

  ionViewWillEnter() {
    this.usuarioId = this.authService.idUsuarioLogueado();
    this.cargarFavoritos()
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarFavoritos() {
    this.isLoading = true;
    try {
      await this.favoritoService.obtenerFavoritosPorUsuario(this.usuarioId);
    } catch (error: any) {
    } finally {
      this.isLoading = false;
    }
  }

  async onEliminarFavorito(favoritoId: string) {
    const confirm = await this.uiService.confirmDeleteFavorite();
    if (!confirm) return;
    const loading = await this.uiService.presentLoading('Eliminando...');
    try {
      await this.favoritoService.eliminarFavorito(favoritoId);
      this.favoritos = this.favoritos.filter(favorito => favorito._id !== favoritoId);
      this.uiService.showSuccessDelete('Vestuario eliminado correctamente');
    } catch (error: any) {
      this.uiService.showAlert(`${error}`);
    } finally {
      loading.dismiss();
    }
  }
}
