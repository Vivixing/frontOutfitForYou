import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PrendaService } from 'src/app/services/prenda.service';

@Component({
  selector: 'app-tab-closet',
  templateUrl: './tab-closet.page.html',
  styleUrls: ['./tab-closet.page.scss'],
  standalone: false
})
export class TabClosetPage implements OnInit {

  prendas: any[] = [];

  constructor(private router: Router, private navCtrl: NavController, private prendaService: PrendaService) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  async cargarPrendas(){
    const userId = localStorage.getItem('user_id');
    console.log('Usuario obtenido por ID', userId);
    if(!userId) return;

    try{
      const response = await this.prendaService.obtenerPrendasPorIdUsuario(userId);
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
