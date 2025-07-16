import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-perfil',
  templateUrl: './tab-perfil.page.html',
  styleUrls: ['./tab-perfil.page.scss'],
  standalone: false,
})
export class TabPerfilPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  goBack() {
    this.navCtrl.back();
  }

}
