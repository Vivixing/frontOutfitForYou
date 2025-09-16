import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() cargarVisualizacionesEvent = new EventEmitter<any>();

  constructor(
    private router:Router
  ) {  }

  ngOnInit() {
  }

  cargaVisualizacion(){
    this.cargarVisualizacionesEvent.emit();
  }

  irAPedirRecomendacion() { 
    this.router.navigate(['/tabs/tabs/tab3'])
  }
}
