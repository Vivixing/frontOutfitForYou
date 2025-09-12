import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TipoPrendaService } from 'src/app/services/tipo-prenda.service';
import { PrendaService } from 'src/app/services/prenda.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab-agregar-prenda',
  templateUrl: './tab-agregar-prenda.page.html',
  styleUrls: ['./tab-agregar-prenda.page.scss'],
  standalone: false,
})
export class TabAgregarPrendaPage implements OnInit {

  categoriaSeleccionada = '';
  nombre = '';
  color= '';
  imagen_base64 = '';
  imagenPreview = '';

  constructor(
    private navCtrl: NavController, 
    private authService:AuthService, 
    private tipoPrendaService: TipoPrendaService, 
    private prendaService:PrendaService, 
    private alertController: AlertController, 
    private router:Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async presentLoading(message: string = 'Procesando...') {
    const loading = await this.loadingController.create({
      message,
      spinner: 'circles', // estilo de spinner
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    return loading; // devolvemos para cerrarlo después
  }


  async showSuccess(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Agregado!',
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

  goBack() {
    this.navCtrl.back();
  }

  archivoSeleccionado(event:any){
    const archivo: File = event.target.files[0];

    if(archivo && archivo.type.startsWith('image/')){
      const lector = new FileReader();
      
      lector.onload = async () => {
        const base64String = (lector.result as string).split(',')[1];

        this.imagenPreview = lector.result as string;

        const loading = await this.presentLoading('Analizando la prenda...'); // ✅ mostrar loading

        try{

          const response = await this.prendaService.predecirPrenda(base64String);

          // Nombre y color siempre
          this.nombre = response.nombre_prenda_predicha;
          this.color = response.color || "No detectado";

          if(this.nombre !== "No detectada"){
            this.showSuccess(`🔍 Prenda detectada: ${response.nombre_prenda_predicha}`)
          }else{
            this.showAlert(`⚠️ ${response.mensaje_usuario}`)
          }

          // Imagen sin fondo si el backend la generó
          if (response.imagen_base64) {
            this.imagen_base64 = response.imagen_base64;
            this.imagenPreview = `data:image/png;base64,${response.imagen_base64}`;
          } else {
            // fallback: imagen original
            this.imagen_base64 = base64String;
          }

        }catch(error:any){
          console.error(error);
          const mensaje = error?.message || '❌ Error al procesar la imagen';
          this.showAlert(mensaje);
          this.imagen_base64 = base64String;
        } finally {
          loading.dismiss(); // ✅ cerrar loading al final
        }
      };
      lector.readAsDataURL(archivo);
    } else{
      this.showAlert('⚠️ Por favor selecciona un archivo de imagen válido')
    }
  }

  async registrarPrenda(){

    if (!this.nombre ) {
      this.showAlert('Por favor, complete el campo del nombre de la prenda');
      return;
    }

    if(!this.imagen_base64){
      this.showAlert('Por favor, complete el campo de la imagen');
      return;
    }

    if(!this.categoriaSeleccionada){
      this.showAlert('Por favor, complete el campo de la categoría seleccionada');
      return;
    }

    if(!this.color){
      this.showAlert('Por favor, complete el campo del color');
      return;
    }

    const loading = await this.presentLoading('Registrando prenda...');

    try{
      const usuarioId = this.authService.idUsuarioLogueado();

      const tipoPrenda = await this.tipoPrendaService.crearTipoPrenda(this.categoriaSeleccionada);
      console.log(tipoPrenda);
      
      const prenda = {
        usuarioId: usuarioId,
        tipoPrendaId: tipoPrenda._id,
        nombre: this.nombre,
        color: this.color,
        imagen_base64: this.imagen_base64
      };

      const response = await this.prendaService.registrarPrenda(prenda);
      this.showSuccess('✅ Prenda registrada correctamente');
      this.limpiarCampos();
      this.router.navigate(['/tabs/tabs/tabCloset']);
    }catch(error:any){
      console.error(error);
      this.showAlert('❌ Error al registrar la prenda');
    } finally {
      loading.dismiss(); // cerrar loading
    }
  }

  limpiarCampos() {
    this.categoriaSeleccionada = '';
    this.nombre = '';
    this.color = '';
    this.imagen_base64 = '';
    this.imagenPreview = '';
  }
}
