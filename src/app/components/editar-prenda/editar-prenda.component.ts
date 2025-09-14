import { Component, OnInit, Input ,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editar-prenda',
  templateUrl: './editar-prenda.component.html',
  styleUrls: ['./editar-prenda.component.scss'],
  standalone: false,
})
export class EditarPrendaComponent  implements OnInit {

  @Input() prenda: any = {};               
  @Output() onEditar = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit() {}

  borrarCampos(){
    if (this.prenda) {
      this.prenda.nombre = '';
      if (this.prenda.tipoPrendaId) {
        this.prenda.tipoPrendaId.categoria = null;
      }
    }
  }

  editarPrenda(){
    console.log('Emitido al padre para actualizar:', this.prenda);
    this.onEditar.emit(this.prenda);
  }

  isHexColorValido(color: string): boolean {
    // Valida colores hexadecimales de 3 o 6 caracteres (sin incluir el '#')
    const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);
  }

}
