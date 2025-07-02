import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-prenda',
  templateUrl: './editar-prenda.component.html',
  styleUrls: ['./editar-prenda.component.scss'],
  standalone: false,
})
export class EditarPrendaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  borrarCampos(){
    //Lógíca de reset para los campos
    console.log('Borrado campos');
  }

  editarPrenda(){
    //Lógica para guardado de prendas
    console.log('Editada prenda con éxito');
  }

}
