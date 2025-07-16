import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabEditarPrendaPage } from './tab-editar-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: TabEditarPrendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabEditarPrendaPageRoutingModule {}
