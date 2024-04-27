import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { LoadingController } from '@ionic/angular';
import { solicitud } from 'src/app/models/usuario/crearSolicitud';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
=======
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002

@Component({
  selector: 'app-provide',
  templateUrl: './provide.page.html',
  styleUrls: ['./provide.page.scss'],
})
export class ProvidePage implements OnInit {

<<<<<<< HEAD
  isColaborador?: boolean;
  datosColaborador: solicitud = {
    nombre: '',
    especialidad: '',
    descripcion: '',
    uid: '',
    tomada: false,
    uidCliente: '' 
  }
  constructor(private authService: AuthService,private helper: HelperService,private loadingController: LoadingController,private store: StorageService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.isColaborador = await this.authService.isColaborador(user.uid);
  
        if (this.isColaborador) {
          // Obtener información adicional del médico
          const colaboradorData: any = await this.authService.getUserAdditionalInfoColaborador(user.uid);
          if (colaboradorData) {
            this.datosColaborador.nombre = colaboradorData.nombre;
            this.datosColaborador.especialidad = colaboradorData.especialidad;
          }
        } else {
        }
      }
    });
  }

  async activarColaborador() {
    try {
      const res = await this.authService.activarColab(this.datosColaborador);
  
      if (res) {
        const loading = await this.loadingController.create({
          message: 'Generando activacion...'
        });
        await loading.present();
  
        console.log('exito al activar colaborador');
        const id = res.id;
        this.datosColaborador.uid = id;
        await this.store.createDoc(this.datosColaborador, 'ColaboradorActivo', id);
        this.helper.presentToast('Su cuenta esta activa');
      } else {
        this.helper.presentToast('Error al activar la cuenta');
      }
    } catch (error) {
      this.helper.presentToast('Error al activar la cuenta');
      console.log('Error al activar la cuenta');
    } finally {
      try {
        await this.loadingController.dismiss();
      } catch (error) {
      }
    }
=======
  constructor() { }

  ngOnInit() {
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002
  }

}
