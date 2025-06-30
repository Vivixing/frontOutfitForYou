import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditarPrendaComponent } from './editar-prenda.component';

@NgModule({
  declarations: [EditarPrendaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [EditarPrendaComponent]
})
export class EditarPrendaModule { }
