import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';


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

  constructor(
    private authService: AuthService, 
    private router:Router, 
    private usuarioService: UsuarioService, 
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.email = '';
    this.contrasena = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async showMensajeBienvenida(mensaje: string) {
    this.uiService.showSuccessWelcome(mensaje)
  }

  async showMensajeError(mensaje:string) {
    this.uiService.showAlert(mensaje)
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      this.contrasena.trim() !== ''
    );
  }

  async login() {
    if(!this.isFormValid()){
      this.showMensajeError('Por favor, rellene todos los campos con información válida');
      return;
    }
    try {
      const user = await this.usuarioService.inicioSesionUsuario(this.email, this.contrasena);
      this.authService.login(user.user_id);
      await this.showMensajeBienvenida('Credenciales válidas. Bienvenido/a 😄');
      this.router.navigate(['tabs/tabs/tab1']);
    }catch(error: any) {
      console.log('Desde el page:', error.message);
      this.showMensajeError(error.message);
    }
  }
}
