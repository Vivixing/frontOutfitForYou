import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecomendacionInicioComponent } from './recomendacion-inicio.component';

@NgModule({
  declarations: [RecomendacionInicioComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RecomendacionInicioComponent]
})
export class RecomendacionInicioModule { }
