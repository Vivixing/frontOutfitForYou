import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRecomendacionPageRoutingModule } from './tab-recomendacion-routing.module';

import { TabRecomendacionPage } from './tab-recomendacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRecomendacionPageRoutingModule
  ],
  declarations: [TabRecomendacionPage]
})
export class TabRecomendacionPageModule {}
