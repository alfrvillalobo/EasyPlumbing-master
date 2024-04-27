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
<<<<<<< HEAD
=======

>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002
  datos: user = {
    nombre: '',
    correo: '',
    numero: '',
    password: '',
    uid: '',
<<<<<<< HEAD
    perfil: 'cliente', // Establece 'cliente' como perfil predeterminado
    especialidad: '' // Añadido para guardar la especialidad del colaborador
  };
=======
    perfil: 'cliente' // Establece 'cliente' como perfil predeterminado
  }
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002

  constructor(
    private auth: AuthService,
    private store: StorageService,
    private helper: HelperService,
    private router: Router
  ) {}

  async registrar() {
<<<<<<< HEAD
    // Validación inicial de campos requeridos
    if (!this.datos.nombre || !this.datos.correo || !this.datos.numero || !this.datos.password || !this.datos.perfil) {
      this.helper.presentToast('Todos los campos son obligatorios.');
      return;
    }

    // Validaciones de longitud
    if (this.datos.nombre.length < 3 || this.datos.nombre.length > 50) {
      this.helper.presentToast('El nombre debe tener entre 3 y 50 caracteres.');
      return;
    }
    if (this.datos.password.length < 8 || this.datos.password.length > 20) {
      this.helper.presentToast('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    // Validación de especialidad para colaboradores
    if (this.datos.perfil === 'colaborador' && !this.datos.especialidad) {
      this.helper.presentToast('Por favor, selecciona una especialidad.');
      return;
    }

    // Verificación de existencia de correo y número de teléfono
    const loader = await this.helper.presentLoandig('Comprobando información...');
    const exists = await this.store.emailOrPhoneExists(this.datos.correo, this.datos.numero);
    if (exists) {
      loader.dismiss();
      this.helper.presentToast('El correo electrónico o número de teléfono ya están registrados.');
      return;
    }

    // Proceso de registro
    try {
      const res = await this.auth.registerUser(this.datos);
      if (res && res.user) {
        const path = this.datos.perfil === 'colaborador' ? 'Colaboradores' : 'Clientes';
        this.datos.uid = res.user.uid;
        this.datos.password = '';  // Limpiar password para seguridad
        await this.store.createDoc(this.datos, path, this.datos.uid);
=======
    if (!this.datos.nombre || !this.datos.correo || !this.datos.numero || !this.datos.password) {
      this.helper.presentToast('Todos los campos son obligatorios');
      return;
    }
  
    this.helper.presentLoandig('Registrando...');
  
    try {
      const res = await this.auth.registerUser(this.datos);
  
      if (res && res.user) {
        const path = this.datos.perfil === 'colaborador' ? 'Colaboradores' : 'Clientes';
        const id = res.user.uid;
        this.datos.uid = id;
        this.datos.password = ''; 
        await this.store.createDoc(this.datos, path, id);
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002
        this.helper.presentToast('Registrado con éxito');
        this.router.navigate(['/login']);
      } else {
        this.helper.presentToast('Error en el registro');
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('Error en el registro:', error);
      this.helper.presentToast('Error en el registro');
    } finally {
      loader.dismiss();
    }
  }
}



=======
      this.helper.presentToast('Error en el registro');
    } finally {
      this.helper.loadingController.dismiss();
    }
  }
}
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002
