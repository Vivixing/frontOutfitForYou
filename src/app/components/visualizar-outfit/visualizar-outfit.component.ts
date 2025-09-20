import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-visualizar-outfit',
  templateUrl: './visualizar-outfit.component.html',
  styleUrls: ['./visualizar-outfit.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizarOutfitComponent  implements OnInit {

  @Input() imageBase64: string | null = null;
  @Input() loading: boolean = false;
  @Input() onAgregarFavorito!: () => void;

  constructor() { }

  ngOnInit() {}

}
