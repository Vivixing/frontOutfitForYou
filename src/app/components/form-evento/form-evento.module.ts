import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEventoComponent } from './form-evento.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FormEventoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FormEventoComponent]
})
export class FormEventoModule { }
