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

  irAtabEditarPrenda(){
    this.router.navigate(['/tabs/tabs/tabEditarPrenda'])
  }
}
