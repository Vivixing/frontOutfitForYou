import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAgregarPrendaPageRoutingModule } from './tab-agregar-prenda-routing.module';

import { TabAgregarPrendaPage } from './tab-agregar-prenda.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAgregarPrendaPageRoutingModule,
    ComponentsModule
],
  declarations: [TabAgregarPrendaPage]
})
export class TabAgregarPrendaPageModule {}
