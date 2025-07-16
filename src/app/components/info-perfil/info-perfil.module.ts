import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InfoPerfilComponent } from './info-perfil.component';

@NgModule({
  declarations: [InfoPerfilComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InfoPerfilComponent]
})
export class InfoPerfilModule { }
