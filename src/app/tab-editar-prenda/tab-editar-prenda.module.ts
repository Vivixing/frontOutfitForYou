import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabEditarPrendaPageRoutingModule } from './tab-editar-prenda-routing.module';

import { TabEditarPrendaPage } from './tab-editar-prenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabEditarPrendaPageRoutingModule
  ],
  declarations: [TabEditarPrendaPage]
})
export class TabEditarPrendaPageModule {}
