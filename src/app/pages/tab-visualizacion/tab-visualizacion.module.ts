import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabVisualizacionPageRoutingModule } from './tab-visualizacion-routing.module';

import { TabVisualizacionPage } from './tab-visualizacion.page';
import { VisualizarOutfitModule } from "../visualizar-outfit/visualizar-outfit.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabVisualizacionPageRoutingModule,
    VisualizarOutfitModule
],
  declarations: [TabVisualizacionPage]
})
export class TabVisualizacionPageModule {}
