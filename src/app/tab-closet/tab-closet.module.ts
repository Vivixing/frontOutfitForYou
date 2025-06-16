import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabClosetPageRoutingModule } from './tab-closet-routing.module';

import { TabClosetPage } from './tab-closet.page';
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabClosetPageRoutingModule,
    ExploreContainerComponentModule
],
  declarations: [TabClosetPage]
})
export class TabClosetPageModule {}
