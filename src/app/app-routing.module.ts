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
    path: 'tab-perfil',
    loadChildren: () => import('./tab-perfil/tab-perfil.module').then( m => m.TabPerfilPageModule)
  },
  {
    path: 'tab-closet',
    loadChildren: () => import('./tab-closet/tab-closet.module').then( m => m.TabClosetPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
