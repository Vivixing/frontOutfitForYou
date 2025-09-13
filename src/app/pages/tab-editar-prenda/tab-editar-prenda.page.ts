import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-editar-prenda',
  templateUrl: './tab-editar-prenda.page.html',
  styleUrls: ['./tab-editar-prenda.page.scss'],
  standalone: false,
})
export class TabEditarPrendaPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
}
