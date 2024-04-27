import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
<<<<<<< HEAD
import { firstValueFrom } from 'rxjs';
=======
const storagePaciente = 'pacienteData';
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getCollection<tipo>(path: string) {
<<<<<<< HEAD
    return this.firestore.collection<tipo>(path).valueChanges();
  }

  getId() {
    return this.firestore.createId();
  }

  // Método corregido para verificar si el correo electrónico o teléfono existen
  async emailOrPhoneExists(email: string, phone: string): Promise<boolean> {
    // Obtener las referencias de las consultas
    const emailRef = this.firestore.collection('usuarios', ref => ref.where('correo', '==', email).limit(1));
    const phoneRef = this.firestore.collection('usuarios', ref => ref.where('numero', '==', phone).limit(1));

    // Convertir los Observables a Promesas usando firstValueFrom
    const emailSnap = await firstValueFrom(emailRef.get());
    const phoneSnap = await firstValueFrom(phoneRef.get());

    // Verificar si existen documentos en las instantáneas
    return !emailSnap.empty || !phoneSnap.empty;
  }
}


=======
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getId() {
    return this.firestore.createId;
  }
}
>>>>>>> 46fd173cd755c599c55732533c0d7ace1423e002
