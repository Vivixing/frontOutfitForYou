import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendacion-inicio',
  templateUrl: './recomendacion-inicio.component.html',
  styleUrls: ['./recomendacion-inicio.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    // Si hay prendas filtradas, usa esa cantidad; si no, muestra 4 por defecto
    return Array(this.visualizaciones.length || 4).fill(0);
  }

  irAPedirRecomendacion() { 
    this.router.navigate(['/tabs/tabs/tab3'])
  }
}
