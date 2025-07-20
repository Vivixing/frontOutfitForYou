import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.scss'],
  standalone: false,
})
export class AgregarPrendaComponent  implements OnInit {

  imagenPreview: string = '';

  @Input() categoriaSeleccionada: string = '';
  @Input() nombre: string = '';
  @Input() color: string = '';
  @Input() imagen_base64: string = '';

  @Output() capturarImagenEvent = new EventEmitter<any>();
  @Output() borrarCamposEvent = new EventEmitter<void>();
  @Output() guardarPrendaEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  capturarImagen(event:any){
    const archivo: File = event.target.files[0];

    if(archivo && archivo.type.startsWith('image/')){
      const lector = new FileReader();
      
      lector.onload = () => {
        this.imagenPreview = lector.result as string;
        this.capturarImagenEvent.emit(event);
      };
      lector.readAsDataURL(archivo);
    }
  }

  borrarCampos(){
    this.borrarCamposEvent.emit();
  }

  guardarPrenda(){
    this.guardarPrendaEvent.emit();
  }
}
