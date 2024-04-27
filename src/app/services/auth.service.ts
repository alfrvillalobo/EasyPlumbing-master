import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { user } from '../models/usuario/usuario';
import { solicitud } from '../models/usuario/crearSolicitud';

interface UserData {
  perfil: string;
  // Añade aquí otros campos que necesites
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  login(correo: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(correo, password);
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  getCurrentUser(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  registerUser(datos: any): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(datos.correo, datos.password)
      .then((result) => {
        return this.firestore.collection('usuarios').doc(result.user.uid).set({
          nombre: datos.nombre,
          correo: datos.correo,
          numero: datos.numero,
          perfil: datos.perfil
          // Añade aquí otros campos necesarios
        }).then(() => result);
      });
  }

  getUserProfile(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  isAdmin(uid: string): Promise<boolean> {
    return this.firestore.collection('admin').doc(uid).get().toPromise()
      .then(doc => {
        const data = doc.data() as UserData;
        return doc.exists && data.perfil === 'admin';
      });
  }

  isColaborador(uid: string): Promise<boolean> {
    return this.firestore.collection('Colaboradores').doc(uid).get().toPromise()
      .then(doc => {
        const data = doc.data() as UserData;
        return doc.exists && data.perfil === 'colaborador';
      });
  }

  isCliente(uid: string): Promise<boolean> {
    return this.firestore.collection('Cliente').doc(uid).get().toPromise()
      .then(doc => {
        const data = doc.data() as UserData;
        return doc.exists && data.perfil === 'cliente';
      });
  }
    // Método para enviar un enlace de restablecimiento de contraseña al correo electrónico
  async resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => console.log("Correo de restablecimiento enviado."))
      .catch(error => console.error("Error enviando correo de restablecimiento: ", error));
  }

  async getUserAdditionalInfoColaborador(uid: string) {
    const userDoc = await this.firestore
      .collection('Colaboradores')
      .doc(uid)
      .ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }

  async activarColab(datosColaborador: solicitud) {
    if (
      !datosColaborador.nombre ||
      !datosColaborador.especialidad ||
      !datosColaborador.descripcion     
    ) {
      throw new Error('Todos los campos deben completarse.');
    }

    try {
      const result = await this.firestore
        .collection('ColaboradorActivo')
        .add(datosColaborador);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getColaboradorActivo(): Observable<solicitud[]> {
    return this.firestore.collection<solicitud>('ColaboradorActivo').valueChanges();
  }

  getUniqueSpecialities() {
    return this.firestore
      .collection<solicitud>('ColaboradorActivo')
      .get()
      .pipe(
        map((querySnapshot) => {
          const especialidades: string[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as solicitud;
            if (data && data.especialidad) {
              especialidades.push(data.especialidad);
            }
          });
          return Array.from(new Set(especialidades));
        })
      );
  }

  getColabActiveByEspecialidad(especialidad: string) {
    return this.firestore
      .collection<solicitud>('ColaboradorActivo', (ref) =>
        ref.where('especialidad', '==', especialidad)
      )
      .valueChanges({ idField: 'id' });
  }

  getSolicitudesColab(): any {
    return this.firestore.collection('SolicitudesColab', ref => ref.where('aceptada', '==', false)).valueChanges();
  }
}

