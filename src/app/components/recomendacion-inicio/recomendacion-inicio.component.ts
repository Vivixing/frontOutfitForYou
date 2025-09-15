import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-recomendacion-inicio',
  templateUrl: './recomendacion-inicio.component.html',
  styleUrls: ['./recomendacion-inicio.component.scss'],
  standalone: false,
})
export class RecomendacionInicioComponent  implements OnInit {

  @Input() visualizaciones: any[] = [];

  constructor() { }

  ngOnInit() {}

}
