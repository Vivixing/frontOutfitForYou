import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-perfil',
  templateUrl: './tab-perfil.page.html',
  styleUrls: ['./tab-perfil.page.scss'],
  standalone: false,
})
export class TabPerfilPage implements OnInit {

  nombre: string = '';
  subs: Subscription[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    // Suscribirse a cambios en el nombre del usuario
    this.subs.push(
      this.usuarioService.nombreUsuario$.subscribe(nombre => {
        this.nombre = nombre;
      })
    );
  }

  async ionViewWillEnter() {
    await this.usuarioService.obtenerNombreUsuarioLogueado(this.authService);
  }

  cerrarSesion() {
    this.authService.logout();
  }

  goBack() {
    this.navCtrl.back();
  }

}
