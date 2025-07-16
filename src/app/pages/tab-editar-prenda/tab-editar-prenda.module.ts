import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabEditarPrendaPageRoutingModule } from './tab-editar-prenda-routing.module';

import { TabEditarPrendaPage } from './tab-editar-prenda.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabEditarPrendaPageRoutingModule,
    ComponentsModule
],
  declarations: [TabEditarPrendaPage]
})
export class TabEditarPrendaPageModule {}
