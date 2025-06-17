import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrendasComponent } from './prendas.component';
import { IonicModule } from '@ionic/angular'

@NgModule({
  declarations: [PrendasComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PrendasComponent]
})
export class PrendasModule { }
