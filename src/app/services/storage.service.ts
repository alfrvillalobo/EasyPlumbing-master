import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
const storagePaciente = 'pacienteData';

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
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getId() {
    return this.firestore.createId;
  }
}
