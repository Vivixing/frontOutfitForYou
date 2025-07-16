import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-agregar-prenda',
  templateUrl: './tab-agregar-prenda.page.html',
  styleUrls: ['./tab-agregar-prenda.page.scss'],
  standalone: false,
})
export class TabAgregarPrendaPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
}
