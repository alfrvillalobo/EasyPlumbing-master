import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { solicitud } from 'src/app/models/usuario/crearSolicitud';
import { user } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-solicitudes-colab',
  templateUrl: './solicitudes-colab.page.html',
  styleUrls: ['./solicitudes-colab.page.scss'],
})
export class SolicitudesColabPage implements OnInit {

  solicitudes: solicitud[] = [];
  datosUser: user[] = [];
  constructor(private authService: AuthService, private firestore: AngularFirestore, private helper: HelperService) { }

  ngOnInit() {
    this.authService.getSolicitudesColab().subscribe((solicitudes) => {
      this.solicitudes = solicitudes;
    });
  }

  aceptarSolicitud(solicitud: solicitud) {
    this.firestore.collection('SolicitudesColab').doc(solicitud.uid).update({ aceptada: true });
    this.helper.presentToast('Solicitud aceptada');
  }

  rechazarSolicitud(solicitud: solicitud) {
    this.firestore.collection('SolicitudesColab').doc(solicitud.uid).update({ aceptada: false });
    this.helper.presentToast('Solicitud rechazada');
  }

}