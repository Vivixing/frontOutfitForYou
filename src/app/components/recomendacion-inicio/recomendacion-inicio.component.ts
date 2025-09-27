import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendacion-inicio',
  templateUrl: './recomendacion-inicio.component.html',
  styleUrls: ['./recomendacion-inicio.component.scss'],
  standalone: false,
})
export class RecomendacionInicioComponent  implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() visualizaciones: any[] = [];

  constructor(
    private router:Router
  ) {  }

  ngOnInit() {
  }

  get skeletonArray() {
    return Array(this.visualizaciones.length || 4).fill(0);
  }

  irAPedirRecomendacion() { 
    this.router.navigate(['/tabs/tabs/tab3'])
  }
}
