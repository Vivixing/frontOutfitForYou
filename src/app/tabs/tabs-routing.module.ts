import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tabCloset',
        loadChildren: () => import('../tab-closet/tab-closet.module').then( m => m.TabClosetPageModule)
      },
      {
        path: 'tabPerfil',
        loadChildren: () => import('../tab-perfil/tab-perfil.module').then( m => m.TabPerfilPageModule)
      },
      {
        path: 'tabRecomendacion',
        loadChildren: () => import('../tab-recomendacion/tab-recomendacion.module').then( m => m.TabRecomendacionPageModule)
      },
      {
        path: 'tabVisualizacion',
        loadChildren: () => import('../tab-visualizacion/tab-visualizacion.module').then( m => m.TabVisualizacionPageModule)
      },
      {
        path: 'tabAgregarPrenda',
        loadChildren: () => import('../tab-agregar-prenda/tab-agregar-prenda.module').then( m => m.TabAgregarPrendaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
