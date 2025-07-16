import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab-perfil',
    loadChildren: () => import('./pages/tab-perfil/tab-perfil.module').then( m => m.TabPerfilPageModule)
  },
  {
    path: 'tab-closet',
    loadChildren: () => import('./pages/tab-closet/tab-closet.module').then( m => m.TabClosetPageModule)
  },
  {
    path: 'tab-recomendacion',
    loadChildren: () => import('./pages/tab-recomendacion/tab-recomendacion.module').then( m => m.TabRecomendacionPageModule)
  },
  {
    path: 'tab-visualizacion',
    loadChildren: () => import('./pages/tab-visualizacion/tab-visualizacion.module').then( m => m.TabVisualizacionPageModule)
  },
  {
    path: 'tab-agregar-prenda',
    loadChildren: () => import('./pages/tab-agregar-prenda/tab-agregar-prenda.module').then( m => m.TabAgregarPrendaPageModule)
  },
  {
    path: 'tab-editar-prenda',
    loadChildren: () => import('./pages/tab-editar-prenda/tab-editar-prenda.module').then( m => m.TabEditarPrendaPageModule)
  },  {
    path: 'tab-login',
    loadChildren: () => import('./pages/tab-login/tab-login.module').then( m => m.TabLoginPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
