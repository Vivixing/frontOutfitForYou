import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: false,
})
export class ExploreContainerComponent implements OnInit {

  @Input() favoritos: any[] = [];
  @Input() cargarFavoritos!: () => void; 
  @Input() isLoading: boolean = false;
  @Output() eliminarFavorito = new EventEmitter<string>();

  constructor(private router:Router){
  }

  ngOnInit() {
  }

  onEliminar(favoritoId: string) {
    this.eliminarFavorito.emit(favoritoId);
  }

  irAPedirRecomendacion() { 
    this.router.navigate(['/tabs/tabs/tab3'])
  }
}
