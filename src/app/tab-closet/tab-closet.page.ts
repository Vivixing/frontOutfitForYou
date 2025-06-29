import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-closet',
  templateUrl: './tab-closet.page.html',
  styleUrls: ['./tab-closet.page.scss'],
  standalone: false
})
export class TabClosetPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAtabAgregarPrenda(){
    this.router.navigate(['/tabs/tabAgregarPrenda']);
  }

}
