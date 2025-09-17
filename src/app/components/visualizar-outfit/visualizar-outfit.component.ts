import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizar-outfit',
  templateUrl: './visualizar-outfit.component.html',
  styleUrls: ['./visualizar-outfit.component.scss'],
  standalone: false,
})
export class VisualizarOutfitComponent  implements OnInit {

  @Input() imageBase64: string | null = null;
  @Input() loading: boolean = false;
  @Input() onAgregarFavorito!: () => void;

  constructor() { }

  ngOnInit() {}

}
