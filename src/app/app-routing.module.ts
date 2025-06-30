import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab-perfil',
    loadChildren: () => import('./tab-perfil/tab-perfil.module').then( m => m.TabPerfilPageModule)
  },
  {
    path: 'tab-closet',
    loadChildren: () => import('./tab-closet/tab-closet.module').then( m => m.TabClosetPageModule)
  },
  {
    path: 'tab-recomendacion',
    loadChildren: () => import('./tab-recomendacion/tab-recomendacion.module').then( m => m.TabRecomendacionPageModule)
  },
  {
    path: 'tab-visualizacion',
    loadChildren: () => import('./tab-visualizacion/tab-visualizacion.module').then( m => m.TabVisualizacionPageModule)
  },
  {
    path: 'tab-agregar-prenda',
    loadChildren: () => import('./tab-agregar-prenda/tab-agregar-prenda.module').then( m => m.TabAgregarPrendaPageModule)
  },
  {
    path: 'tab-editar-prenda',
    loadChildren: () => import('./tab-editar-prenda/tab-editar-prenda.module').then( m => m.TabEditarPrendaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
