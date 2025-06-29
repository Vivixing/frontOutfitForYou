import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAgregarPrendaPage } from './tab-agregar-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: TabAgregarPrendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAgregarPrendaPageRoutingModule {}
