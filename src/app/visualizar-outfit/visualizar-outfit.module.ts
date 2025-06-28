import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VisualizarOutfitComponent } from './visualizar-outfit.component';


@NgModule({
  declarations: [VisualizarOutfitComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [VisualizarOutfitComponent]
})
export class VisualizarOutfitModule { }
