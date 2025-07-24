import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrls: ['./prendas.component.scss'],
  standalone: false,
})
export class PrendasComponent  implements OnInit {

  @Input() prendas: any[] = [];
  @Output() VerPrendaEvent= new EventEmitter<void>();

  constructor(private router:Router) { }

  ngOnInit() {}

  verPrenda(){
    this.VerPrendaEvent.emit();
  }

  isHexColorValido(color: string): boolean {
    // Valida colores hexadecimales de 3 o 6 caracteres (sin incluir el '#')
    const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);
  }

  irAtabEditarPrenda(){
    this.router.navigate(['/tabs/tabs/tabEditarPrenda'])
  }

}
