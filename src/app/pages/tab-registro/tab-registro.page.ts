import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-registro',
  templateUrl: './tab-registro.page.html',
  styleUrls: ['./tab-registro.page.scss'],
  standalone:false
})
export class TabRegistroPage implements OnInit {

  showPassword = false;
  
  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
