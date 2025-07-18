import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.scss'],
  standalone: false,
})
export class InfoPerfilComponent  implements OnInit {

  @Input() nombre: string = '';
  @Output() cerrarSesion = new EventEmitter<void>();

  constructor(private router:Router) { }

  ngOnInit() {}

  alCerrarSesion(){
    this.cerrarSesion.emit();
  }

  irAFavoritos(){
    this.router.navigate(['/tabs/tabs/tab2']);
  }
}
