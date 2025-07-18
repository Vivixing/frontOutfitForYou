import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab-perfil',
  templateUrl: './tab-perfil.page.html',
  styleUrls: ['./tab-perfil.page.scss'],
  standalone: false,
})
export class TabPerfilPage implements OnInit {

  nombre: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.nombre = await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
  }
  
  cerrarSesion(){
    this.authService.logout();
  }

  goBack() {
    this.navCtrl.back();
  }

}
