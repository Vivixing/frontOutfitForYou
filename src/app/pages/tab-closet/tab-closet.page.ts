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

  constructor(
    private router: Router, 
    private navCtrl: NavController, 
    private prendaService: PrendaService, 
    private authService:AuthService,  
    private uiService: UiService  
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarPrendas();
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarPrendas(){
    
    const usuarioId = this.authService.idUsuarioLogueado();
    console.log('Usuario obtenido por ID', usuarioId);
    if(!usuarioId) {
      this.uiService.showAlert('No se encontró el id del usuario')
    }

    try{
      const response = await this.prendaService.obtenerPrendasPorIdUsuario(usuarioId);
      this.prendas = response.data;
      console.log("Lista de prendas por Id usuario", this.prendas);
    }catch(error){
      console.error('Error al cargar prendas:', error);
    }

  }

  irAtabAgregarPrenda(){
    this.router.navigate(['/tabs/tabs/tabAgregarPrenda']);
  }
}
