import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-visualizacion',
  templateUrl: './tab-visualizacion.page.html',
  styleUrls: ['./tab-visualizacion.page.scss'],
  standalone: false,
})
export class TabVisualizacionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
}
