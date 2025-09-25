import { PrendaService } from 'src/app/services/prenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router, 
    private navCtrl: NavController, 
    private prendaService: PrendaService, 
    private authService:AuthService,  
    private uiService: UiService  
  ) { }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.cargarPrendas();
  }

  async cargarPrendas(){

    this.isLoading = true;
    const usuarioId = this.authService.idUsuarioLogueado();
    //const loading = await this.uiService.presentLoading('Cargando Prendas...');

    if(!usuarioId) {
      this.uiService.showAlert('No se encontró el id del usuario')
    }

    try{
      const response = await this.prendaService.obtenerPrendasPorIdUsuario(usuarioId);
      this.prendas = response.data.filter((prenda:any )=> prenda.estado === true)
      this.prendasFiltradas = [...this.prendas];
    }catch(error:any){
      this.uiService.showAlert(error)
    }finally{
      //loading.dismiss();
      this.isLoading = false;
    }
  }

  async eliminarPrenda(prendaId: string){
    const confirm = await this.uiService.confirmDeleteClothe();
    if (!confirm) return;
    //const loading = await this.uiService.presentLoading('Eliminando...');
    try{
      await this.prendaService.eliminarPrenda(prendaId);
      this.prendas = this.prendas.filter(prenda => prenda._id !== prendaId);
      this.prendasFiltradas = this.prendasFiltradas.filter(prenda => prenda._id !== prendaId);
      this.uiService.showSuccessDelete('Prenda eliminada correctamente');
    }catch(error:any){
      this.uiService.showAlert(error);
    } finally{
      //loading.dismiss();
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

  irAtabAgregarPrenda(){
    this.router.navigate(['/tabs/tabs/tabAgregarPrenda']);
  }
}
