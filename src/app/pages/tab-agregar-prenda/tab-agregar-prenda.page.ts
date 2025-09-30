import { TipoPrendaService } from 'src/app/services/tipo-prenda.service';
import { PrendaService } from 'src/app/services/prenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  imagenPreview = '';
  estilo = '';
  ocasiones: string[] = [];

  constructor(
    private navCtrl: NavController, 
    private authService:AuthService, 
    private tipoPrendaService: TipoPrendaService, 
    private prendaService:PrendaService, 
    private uiService: UiService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  archivoSeleccionado(event:any){

    this.limpiarCampos();
    
    const archivo: File = event.target.files[0];

    if(archivo && archivo.type.startsWith('image/')){
      const lector = new FileReader();
      
      lector.onload = async () => {
        const base64String = (lector.result as string).split(',')[1];

        this.imagenPreview = lector.result as string;

        const loading = await this.uiService.presentLoading('Analizando la prenda...'); // ✅ mostrar loading

        try{

          const response = await this.prendaService.predecirPrenda(base64String);

          // Nombre y color siempre
          this.nombre = response.nombre_prenda_predicha;
          this.color = response.color || "No detectado";
          this.estilo = response.estilo || '';
          this.ocasiones = response.ocasiones || [];

          if(this.nombre !== "No detectada"){
            this.uiService.showSuccessPredictClothe(`La prenda detectada es: ${response.nombre_prenda_predicha}`)
          }else{
            this.uiService.showWarningMessage(`${response.mensaje_usuario}`)
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
          this.uiService.showAlert(error);
          this.imagen_base64 = base64String;
        } finally {
          loading.dismiss();
        }
      };
      lector.readAsDataURL(archivo);
    } else{
      this.uiService.showAlert('Por favor selecciona un archivo de imagen válido')
    }
  }

  async registrarPrenda(){

    if (!this.nombre ) {
      this.uiService.showWarningMessage('Por favor, complete el campo del nombre de la prenda');
      return;
    }

    if(!this.imagen_base64){
      this.uiService.showWarningMessage('Por favor, complete el campo de la imagen');
      return;
    }

    if(!this.categoriaSeleccionada){
      this.uiService.showWarningMessage('Por favor, complete el campo de la categoría seleccionada');
      return;
    }

    if(!this.color){
      this.uiService.showWarningMessage('Por favor, complete el campo del color');
      return;
    }

    const loading = await this.uiService.presentLoading('Registrando prenda...');

    try{
      const usuarioId = this.authService.idUsuarioLogueado();

      const tipoPrenda = await this.tipoPrendaService.crearTipoPrenda(this.categoriaSeleccionada);
      console.log(tipoPrenda);
      
      const prenda = {
        usuarioId: usuarioId,
        tipoPrendaId: tipoPrenda._id,
        nombre: this.nombre,
        color: this.color,
        imagen_base64: this.imagen_base64,
        estilo: this.estilo,     
        ocasiones: this.ocasiones
      };

      await this.prendaService.registrarPrenda(prenda);
      this.uiService.showSuccessAddClothe('Prenda registrada correctamente');
      this.limpiarCampos();
      this.router.navigate(['/tabs/tabs/tabCloset']);
    }catch(error:any){
      this.uiService.showAlert(error);
    } finally {
      loading.dismiss();
    }
  }

  limpiarCampos() {
    this.categoriaSeleccionada = '';
    this.nombre = '';
    this.color = '';
    this.imagen_base64 = '';
    this.imagenPreview = '';
    this.estilo = '';
    this.ocasiones = [];
  }
}
