import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
  standalone: false,
})
export class FormEventoComponent  implements OnInit {

  constructor() { }

    @Input() ocasion: string = '';
    @Input() vestuarioSugerido: any[] = [];
    @Input() usuarioId: string = '';

    @Output() ocasionChange = new EventEmitter<string>();
    @Output() generarRecomendacionEvent = new EventEmitter<void>();
    @Output() guardarRecomendacionEvent = new EventEmitter<void>();

  ngOnInit() {}

  guardar() {
    this.guardarRecomendacionEvent.emit();
  }

  generar() {
    this.generarRecomendacionEvent.emit();
  }

}
