import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRecomendacionPageRoutingModule } from './tab-recomendacion-routing.module';

import { TabRecomendacionPage } from './tab-recomendacion.page';
import { RecomendacionEventoModule } from "../recomendacion-evento/recomendacion-evento.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRecomendacionPageRoutingModule,
    RecomendacionEventoModule
],
  declarations: [TabRecomendacionPage]
})
export class TabRecomendacionPageModule {}
