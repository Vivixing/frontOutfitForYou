import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabVisualizacionPageRoutingModule } from './tab-visualizacion-routing.module';

import { TabVisualizacionPage } from './tab-visualizacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabVisualizacionPageRoutingModule,
    ComponentsModule
],
  declarations: [TabVisualizacionPage]
})
export class TabVisualizacionPageModule {}
