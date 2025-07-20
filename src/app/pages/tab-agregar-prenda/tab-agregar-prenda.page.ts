import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TipoPrendaService } from 'src/app/services/tipo-prenda.service';
import { PrendaService } from 'src/app/services/prenda.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private navCtrl: NavController, private authService:AuthService, private tipoPrendaService: TipoPrendaService, private prendaService:PrendaService, private alertController: AlertController, private router:Router) { }

  ngOnInit() {
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
        this.imagen_base64 = base64String;

        try{
          const response = await this.prendaService.predecirPrenda(base64String);
          this.categoriaSeleccionada = response.nombre_prenda_predicha;
          this.showSuccess(`🔍 Prenda detectada: ${response.nombre_prenda_predicha}`)
        }catch(error:any){
          console.error(error);
          this.showAlert('❌ Error al predecir la prenda');
        }
      };
      lector.readAsDataURL(archivo);
    } else{
      this.showAlert('❌ Por favor selecciona un archivo de imagen válido')
    }
  }

  async registrarPrenda(){
    try{
      const usuarioId = this.authService.idUsuarioLogueado();

      let tipoPrenda = await this.tipoPrendaService.obtenerTipoPorCategoria(this.categoriaSeleccionada);
      if (!tipoPrenda) {
        tipoPrenda = await this.tipoPrendaService.crearTipoPrenda(this.categoriaSeleccionada);
      }

      const prenda = {
        usuarioId,
        tipoPrendaId: tipoPrenda.id,
        nombre: this.nombre,
        color: this.color,
        imagen_base64: this.imagen_base64
      };

      const response = await this.prendaService.registrarPrenda(prenda);
      this.showSuccess('✅ Prenda registrada correctamente');
      this.router.navigate(['/tabs/tabs/tabCloset']);
    }catch(error:any){
      console.error(error);
      this.showAlert('❌ Error al registrar la prenda');
    }
  }

  limpiarCampos() {
    this.categoriaSeleccionada = '';
    this.nombre = '';
    this.color = '';
    this.imagen_base64 = '';
  }
}
