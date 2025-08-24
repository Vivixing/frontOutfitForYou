import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
  standalone: false,
})
export class FormEventoComponent  implements OnInit {

  constructor(private router: Router) { }

    @Input() ocasion: string = '';
    @Input() vestuarioSugerido: any[] = [];
    @Input() usuarioId: string = '';

    @Output() ocasionChange = new EventEmitter<string>();
    @Output() generarRecomendacionEvent = new EventEmitter<void>();
    @Output() guardarRecomendacionEvent = new EventEmitter<void>();

  ngOnInit() {}

  irAtabRecomendacion(){
    this.router.navigate(['/tabs/tabs/tabRecomendacion']);
  }

  guardar() {
    this.guardarRecomendacionEvent.emit();
  }

  generar() {
    this.generarRecomendacionEvent.emit();
  }

}
