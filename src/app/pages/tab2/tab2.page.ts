import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { UiService } from 'src/app/services/ui.service';

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

  constructor(
    private navCtrl: NavController,
    private favoritoService: FavoritoService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  ngOnInit(){
    this.usuarioId = this.authService.idUsuarioLogueado();
    console.log('UsuarioId',this.usuarioId);
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarFavoritos(){
    this.isLoading = true;
    const loading = await this.uiService.presentLoading('Cargando Favoritos...');
    try{
      const response = await this.favoritoService.obtenerFavoritosPorUsuario(this.usuarioId);
      this.favoritos = response.data.filter((favorito: any) => favorito.estado === true);
      console.log('Favoritos obtenidos:', this.favoritos);
    }catch(error){
      console.error('Error al cargar favoritos', error);
      this.uiService.showAlert('Error al cargar favoritos');
    }finally {
      loading.dismiss();
      this.isLoading = false;
    }
  }

  async onEliminarFavorito(favoritoId:string){
    const confirm = await this.uiService.confirmDeleteFavorite();
    if (!confirm) return;

    const loading = await this.uiService.presentLoading('Eliminando...');
    try{
      await this.favoritoService.eliminarFavorito(favoritoId);
      this.favoritos = this.favoritos.filter(favorito => favorito._id !== favoritoId);
      this.uiService.showSuccessDelete('Vestuario eliminado correctamente');
    }catch (error){
      console.error('Error al eliminar favorito', error);
      this.uiService.showAlert('Error al eliminar favorito');
    }finally {
      loading.dismiss();
    }
  }
}
