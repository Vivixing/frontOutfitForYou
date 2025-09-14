import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

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

  ngOnInit() {
    this.cargarFavoritos();
  }

  onEliminar(favoritoId: string) {
    this.eliminarFavorito.emit(favoritoId);
  }
}
