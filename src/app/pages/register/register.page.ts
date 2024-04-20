
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  datos: user = {
    nombre: '',
    correo: '',
    numero: '',
    password: '',
    uid: '',
    perfil: ['cliente', 'colaborador']
  }

  constructor(
    private auth: AuthService,
    private store: StorageService,
    private helper: HelperService,
    private router: Router
  ) {}

  async registrar() {
    if (!this.datos.nombre || !this.datos.correo || !this.datos.numero || !this.datos.password) {
      this.helper.presentToast('Todos los campos son obligatorios');
      return;
    }
  
    this.helper.presentLoandig('Registrando...');
  
    try {
      const res = await this.auth.registerUser(this.datos);
  
      if (res && res.user) {
        console.log('exito al crear usuario');
        const path = 'Usuarios';
        const id = res.user.uid;
        this.datos.uid = id;
        this.datos.password = ''; 
        await this.store.createDoc(this.datos, path, id);
        this.helper.presentToast('Registrado con éxito');
        this.router.navigate(['/login']);
      } else {
        this.helper.presentToast('Error en el registro');
      }
    } catch (error) {
      this.helper.presentToast('Error en el registro');
    } finally {
      this.helper.loadingController.dismiss();
    }
  }
  
}