import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
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

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      this.contrasena.trim() !== ''
    );
  }

  async login() {
    if(!this.isFormValid()){
      this.uiService.showAlert('Por favor, rellene todos los campos con información válida');
      return;
    }
    try {
      const user = await this.usuarioService.inicioSesionUsuario(this.email, this.contrasena);
      this.authService.login(user.user_id);
      await this.uiService.showSuccessWelcome('Credenciales válidas. Bienvenido/a 😄');
      this.router.navigate(['tabs/tabs/tab1']);
    }catch(error: any) {
      this.uiService.showAlert(error.message);
    }
  }
}
