import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  
  constructor(private navCtrl: NavController, private authService: AuthService, private router: Router, private usuarioService:UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
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

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
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
      this.showAlert('Por favor, rellene todos los campos con información válida');
      return;
    }

    const nombreRegex = /^[A-Za-z]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.showAlert("El nombre solo debe contener letras");
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
      console.error('Desde el page registro:', error.message);
      this.showAlert(error.message || 'Ocurrió un error al crear el usuario.');
    }
  }

  login(user_id:string): void {
    this.authService.login(user_id);
    this.showSuccess('Usuario creado con éxito. Bienvenido/a 😄');
    this.router.navigate(['tabs/tabs/tab1']);
  }
}
