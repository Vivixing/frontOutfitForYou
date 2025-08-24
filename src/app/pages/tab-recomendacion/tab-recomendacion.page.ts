import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab-recomendacion',
  templateUrl: './tab-recomendacion.page.html',
  styleUrls: ['./tab-recomendacion.page.scss'],
  standalone: false,
})
export class TabRecomendacionPage implements OnInit {

  vestuarioSugerido: any[] = [];

  constructor(private navCtrl: NavController, private localStorageService:LocalStorageService) { }

  ngOnInit() { 
    this.vestuarioSugerido = this.localStorageService.getItem('vestuarioSugerido');
    console.log('Vestuario recuperado', this.vestuarioSugerido);
  }

  goBack() {
    this.navCtrl.back();
  }
}
