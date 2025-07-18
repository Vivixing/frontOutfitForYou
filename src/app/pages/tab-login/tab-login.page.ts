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
  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router:Router, private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async showSuccess(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      this.contrasena.trim() !== ''
    );
  }

  async login() {
    if(!this.isFormValid()){
      this.showAlert('Por favor, rellene todos los campos con información válida');
      return;
    }
    try {
      const user = await this.usuarioService.inicioSesionUsuario(this.email, this.contrasena);
      this.authService.login(user.user_id);
      await this.showSuccess('Credenciales válidas. Bienvenido/a 😄');
      this.router.navigate(['tabs/tabs/tab1']);
    }catch(error: any) {
      console.log('Desde el page:', error.message);
      this.showAlert(error.message);
    }
  }
}
