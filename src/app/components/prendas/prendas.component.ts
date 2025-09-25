import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrls: ['./prendas.component.scss'],
  standalone: false,
})
export class PrendasComponent  implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() prendas: any[] = [];
  @Input() prendasFiltradas: any = [];

  @Output() aplicarFiltroCategoriaEvent = new EventEmitter<string>()
  @Output() VerPrendaEvent= new EventEmitter<void>();
  @Output() eliminarPrendaEvent = new EventEmitter<string>();

  constructor(private router:Router) { }

  ngOnInit() {
    this.verPrenda()
  }

  ionViewWillEnter() {
  }

  verPrenda(){
    this.VerPrendaEvent.emit();
  }

  get skeletonArray() {
    return Array(this.prendasFiltradas.length || 4).fill(0);
  }

  isHexColorValido(color: string): boolean {
    // Valida colores hexadecimales de 3 o 6 caracteres (sin incluir el '#')
    const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);
  }

  onAplicarFiltro(categoria?: string) {
    this.aplicarFiltroCategoriaEvent.emit(categoria);
  }

  onEliminarPrenda(prendaId: string) {
    this.eliminarPrendaEvent.emit(prendaId);
  }

  irAtabEditarPrenda(prendaId: string){
    this.router.navigate(['/tabs/tabs/tabEditarPrenda'], {queryParams: { id: prendaId } });
  }

  irAtabAgregarPrenda() { 
    this.router.navigate(['/tabs/tabs/tabAgregarPrenda'])
  }

}
