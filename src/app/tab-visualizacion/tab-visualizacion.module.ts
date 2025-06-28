import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabVisualizacionPageRoutingModule } from './tab-visualizacion-routing.module';

import { TabVisualizacionPage } from './tab-visualizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabVisualizacionPageRoutingModule
  ],
  declarations: [TabVisualizacionPage]
})
export class TabVisualizacionPageModule {}
