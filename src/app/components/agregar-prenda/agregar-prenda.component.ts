import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.scss'],
  standalone: false,
})
export class AgregarPrendaComponent  implements OnInit {

  @Input() imagenPreview: string = '';
  @Input() categoriaSeleccionada: string = '';
  @Input() nombre: string = '';
  @Input() color: string = '';
  @Input() imagen_base64: string = '';

  @Output() colorChange = new EventEmitter<string>();
  @Output() nombrePrendaChange = new EventEmitter<string>();
  @Output() categoriaSeleccionadaChange = new EventEmitter<string>();
  @Output() capturarImagenEvent = new EventEmitter<any>();
  @Output() borrarCamposEvent = new EventEmitter<void>();
  @Output() guardarPrendaEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  capturarImagen(event:any){
    this.capturarImagenEvent.emit(event);
  }

  borrarCampos(){
    this.borrarCamposEvent.emit();
  }

  guardarPrenda(){
    this.guardarPrendaEvent.emit();
  }
}
