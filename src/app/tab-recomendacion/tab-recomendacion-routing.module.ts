import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabRecomendacionPage } from './tab-recomendacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabRecomendacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRecomendacionPageRoutingModule {}
