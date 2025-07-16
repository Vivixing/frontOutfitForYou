import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrls: ['./prendas.component.scss'],
  standalone: false,
})
export class PrendasComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  irAtabEditarPrenda(){
    this.router.navigate(['/tabs/tabs/tabEditarPrenda'])
  }
}
