import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.scss'],
  standalone: false,
})
export class AgregarPrendaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  capturarImagen(){
    //Lógica para abrir la cámara
    console.log('Capturar imagen');
  }

  borrarCampos(){
    //Lógíca de reset para los campos
    console.log('Borrado campos');
  }

  guardarPrenda(){
    //Lógica para guardado de prendas
    console.log('Guardada prenda con éxito');
  }
}
