import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-login',
  templateUrl: './tab-login.page.html',
  styleUrls: ['./tab-login.page.scss'],
  standalone: false,
})
export class TabLoginPage implements OnInit {

  showPassword = false;
  nombreUsuario: string = '';
  claveUsuario: string = '';

  constructor(private authService: AuthService, private router:Router, private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Su nombre de usuario o contraseña son incorrectos',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async login() {
    const user = await this.usuarioService.inicioSesionUsuario(this.nombreUsuario, this.claveUsuario);
    if (user) {
      this.authService.login(user._id);
      this.router.navigate(['/tabs/tabs/tab1']);
    }
    else{
      console.log('Nombre de usuario o contraseña no válidos');
      this.showAlert();
    }
  }

}
