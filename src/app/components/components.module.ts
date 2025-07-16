import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AgregarPrendaComponent } from './agregar-prenda/agregar-prenda.component';
import { EditarPrendaComponent } from './editar-prenda/editar-prenda.component';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { FormEventoComponent } from './form-evento/form-evento.component';
import { InfoPerfilComponent } from './info-perfil/info-perfil.component';
import { PrendasComponent } from './prendas/prendas.component';
import { RecomendacionEventoComponent } from './recomendacion-evento/recomendacion-evento.component';
import { RecomendacionInicioComponent } from './recomendacion-inicio/recomendacion-inicio.component';
import { VisualizarOutfitComponent } from './visualizar-outfit/visualizar-outfit.component';

@NgModule({
  declarations: [
    AgregarPrendaComponent,
    EditarPrendaComponent,
    ExploreContainerComponent,
    FormEventoComponent,
    InfoPerfilComponent,
    PrendasComponent,
    RecomendacionEventoComponent,
    RecomendacionInicioComponent,
    VisualizarOutfitComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
  ],
  exports: [
    AgregarPrendaComponent,
    EditarPrendaComponent,
    ExploreContainerComponent,
    FormEventoComponent,
    InfoPerfilComponent,
    PrendasComponent,
    RecomendacionEventoComponent,
    RecomendacionInicioComponent,
    VisualizarOutfitComponent
  ]
})
export class ComponentsModule { }
