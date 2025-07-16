import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabPerfilPageRoutingModule } from './tab-perfil-routing.module';
import { TabPerfilPage } from './tab-perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPerfilPageRoutingModule,
    ComponentsModule
],
  declarations: [TabPerfilPage]
})
export class TabPerfilPageModule {}
