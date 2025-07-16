import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-registro',
  templateUrl: './tab-registro.page.html',
  styleUrls: ['./tab-registro.page.scss'],
  standalone:false
})
export class TabRegistroPage implements OnInit {

  showPassword = false;
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
