import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-recomendacion',
  templateUrl: './tab-recomendacion.page.html',
  styleUrls: ['./tab-recomendacion.page.scss'],
  standalone: false,
})
export class TabRecomendacionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
}
