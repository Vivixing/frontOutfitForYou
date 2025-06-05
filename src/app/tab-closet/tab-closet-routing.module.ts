import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabClosetPage } from './tab-closet.page';

const routes: Routes = [
  {
    path: '',
    component: TabClosetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabClosetPageRoutingModule {}
