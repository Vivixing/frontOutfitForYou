import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabClosetPageRoutingModule } from './tab-closet-routing.module';

import { TabClosetPage } from './tab-closet.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabClosetPageRoutingModule,
    ComponentsModule
],
  declarations: [TabClosetPage]
})
export class TabClosetPageModule {}
