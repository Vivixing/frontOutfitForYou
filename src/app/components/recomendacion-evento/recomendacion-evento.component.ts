import { Component,EventEmitter,Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-recomendacion-evento',
  templateUrl: './recomendacion-evento.component.html',
  styleUrls: ['./recomendacion-evento.component.scss'],
  standalone: false,
})
export class RecomendacionEventoComponent  implements OnInit {

  @Input() vestuarioSugerido: any;
  @Input() imagenUsuario: string | null = null;

  @Output() capturarImagenUsuarioEvent = new EventEmitter<any>()
  
  prendaSuperior : any
  prendaInferior : any

  constructor(private router: Router, private localStorageService:LocalStorageService) { }

  ngOnInit() {
    if(this.vestuarioSugerido?.data){
      this.prendaSuperior = this.vestuarioSugerido.data.find((p:any) => p.tipoPrendaId?.categoria === 'Superior');
      this.prendaInferior = this.vestuarioSugerido.data.find((p:any) => p.tipoPrendaId?.categoria === 'Inferior');
    }
    console.log("Vestuario recibido en el hijo:", this.vestuarioSugerido.data);
  }


  cargarImagenUsuario(event:any){
    this.capturarImagenUsuarioEvent.emit(event);
  }

  irAtabVisualizacion(){
    const data = {
      persona: this.imagenUsuario,
      prendas: this.vestuarioSugerido?.data || []
    };
    this.localStorageService.setItem('visualizacionData',data);
    this.router.navigate(['/tabs/tabs/tabVisualizacion']);
  }

}
