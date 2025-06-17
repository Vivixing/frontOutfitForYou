import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabClosetPageRoutingModule } from './tab-closet-routing.module';

import { TabClosetPage } from './tab-closet.page';
import { PrendasModule } from "../prendas/prendas.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabClosetPageRoutingModule,
    PrendasModule
],
  declarations: [TabClosetPage]
})
export class TabClosetPageModule {}
