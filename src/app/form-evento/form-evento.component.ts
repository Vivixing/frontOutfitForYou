import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
  standalone: false,
})
export class FormEventoComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  irAtabRecomendacion(){
    this.router.navigate(['/tabs/tabRecomendacion']);
  }

}
