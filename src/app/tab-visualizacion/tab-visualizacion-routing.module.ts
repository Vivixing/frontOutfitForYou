import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabVisualizacionPage } from './tab-visualizacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabVisualizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabVisualizacionPageRoutingModule {}
