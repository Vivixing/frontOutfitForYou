import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendacion-evento',
  templateUrl: './recomendacion-evento.component.html',
  styleUrls: ['./recomendacion-evento.component.scss'],
  standalone: false,
})
export class RecomendacionEventoComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  irAtabVisualización(){
    this.router.navigate(['/tabs/tabVisualizacion']);
  }
}
