import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-registro',
  templateUrl: './tab-registro.page.html',
  styleUrls: ['./tab-registro.page.scss'],
  standalone:false
})
export class TabRegistroPage implements OnInit {

  showPassword = false;
  nombre = '';
  email = '';
  contrasena = '';
  
  constructor(
    private navCtrl: NavController, 
    private authService: AuthService, 
    private router: Router, 
    private usuarioService:UsuarioService, 
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return (
      this.nombre.trim() !== '' &&
      this.email.trim() !== '' &&
      this.contrasena.trim() !== ''
    );
  }

  async crearUsuario(): Promise<void> {
    if(!this.isFormValid()){
      this.uiService.showAlert('Por favor, rellene todos los campos con información válida');
      return;
    }

    const nombreRegex = /^[A-Za-z]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.uiService.showAlert("El nombre solo debe contener letras");
      return;
    }

    const usuario = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
    };

    try{
      const reponse = await this.usuarioService.crearUsuario(usuario);
      if(reponse){
        this.login(reponse.user_id);
      }
    }catch(error:any){
      this.uiService.showAlert(error.message || 'Ocurrió un error al crear el usuario.');
    }
  }

  login(user_id:string): void {
    this.authService.login(user_id);
    this.uiService.showSuccessWelcome('Usuario creado con éxito. Bienvenido/a 😄');
    this.router.navigate(['tabs/tabs/tab1']);
  }
}
