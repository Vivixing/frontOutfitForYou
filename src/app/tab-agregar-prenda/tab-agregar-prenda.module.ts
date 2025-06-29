import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAgregarPrendaPageRoutingModule } from './tab-agregar-prenda-routing.module';

import { TabAgregarPrendaPage } from './tab-agregar-prenda.page';
import { AgregarPrendaModule } from "../agregar-prenda/agregar-prenda.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAgregarPrendaPageRoutingModule,
    AgregarPrendaModule
],
  declarations: [TabAgregarPrendaPage]
})
export class TabAgregarPrendaPageModule {}
