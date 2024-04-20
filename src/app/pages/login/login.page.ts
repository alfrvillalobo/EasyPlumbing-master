import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

// Agrega esta importación
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  // Agrega FormsModule a los providers
  providers: [FormsModule]
})
export class LoginPage {

  credenciales = {
    correo: '' as string,
    password: '' as string
  };

  constructor(
    private router: Router,   
    private auth: AuthService,
    private helper: HelperService
  ) {}

  async login() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.credenciales.correo
      }
    };
  
    if (
      this.credenciales &&
      this.credenciales.correo.trim() !== '' &&
      this.credenciales.password.trim() !== ''
    ) {
      const loader = await this.helper.presentLoandig('Ingresando...');
  
      try {
        const userCredential = await this.auth.login(this.credenciales.correo, this.credenciales.password);
        const user = userCredential.user;
       
        loader.dismiss();
  
        if (user) {
          if (await this.auth.isAdmin(user.uid) || await this.auth.isColaborador(user.uid)) {
            this.router.navigate(['./home'], navigationExtras);
          } else {
            this.helper.presentToast('Ingresado con éxito');
            this.router.navigate(['./home'], navigationExtras);
          }
        }
      } catch (error: any) {
        console.log('error', error);
        loader.dismiss();

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.helper.presentToast('Usuario o contraseña incorrectos');
        } else {
          this.helper.presentToast('Ocurrió un error durante el inicio de sesión');
        }
      }
    } else {
      this.helper.presentToast('Por favor, complete todos los campos');
    }
  }
  register() {
    this.router.navigate(['register']); // Navega a la página de registro
  }
}
