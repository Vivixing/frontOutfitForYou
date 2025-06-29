import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AgregarPrendaComponent } from './agregar-prenda.component';

@NgModule({
  declarations: [AgregarPrendaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AgregarPrendaComponent]
})
export class AgregarPrendaModule { }
