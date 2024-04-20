import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { user } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularfire: AngularFireAuth,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private nfFireAuth: AngularFireAuth
  ) {}

  login(correo: string, password: string) {
    return this.angularfire.signInWithEmailAndPassword(correo, password);
  }

  async Logout() {
    await this.angularfire.signOut();
  }

  registerUser(datos: user) {
    return this.angularfire.createUserWithEmailAndPassword(
      datos.correo,
      datos.password
    );
  }

  async resetPassword(correo: string) {
    return this.afAuth.sendPasswordResetEmail(correo);
  }
  
  getCurrentUser() {
    return this.afAuth.authState;
  }

  async getUserAdditionalInfoUsers(uid: string) {
    const userDoc = await this.firestore
      .collection('Usuarios')
      .doc(uid)
      .ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }
  
  async getUserAdditionalInfoColaborador(uid: string) {
    const userDoc = await this.firestore
      .collection('colaborador')
      .doc(uid)
      .ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }

  async getUserAdditionalInfoAdmin(uid: string) {
    const userDoc = await this.firestore.collection('admin').doc(uid).ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }

  async isAdmin(uid: string): Promise<boolean> {
    const userDoc = await this.firestore.collection('admin').doc(uid).ref.get();
    if (userDoc.exists) {
      const userData: any = userDoc.data(); 
      return userData.perfil === 'admin';
    } else {
      return false;
    }
  }

  async isColaborador(uid: string): Promise<boolean> {
    const userDoc = await this.firestore
      .collection('medicos')
      .doc(uid)
      .ref.get();
    if (userDoc.exists) {
      const userData: any = userDoc.data(); 
      return userData.perfil === 'colaborador';
    } else {
      return false;
    }
  }

}
