import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { solicitud } from 'src/app/models/usuario/crearSolicitud';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  isModalOpen = false;
  especialidad: string[] = [];
  filtroEspecialidad: string = '';
  colabActive : solicitud[] = [];
  constructor(private authService: AuthService,private firestore: AngularFirestore,private helper: HelperService) { }

  ngOnInit() {
    // Utilizamos la alternativa con *ngFor para obtener especialidades
    this.authService.getUniqueSpecialities().subscribe((especialidades) => {
      this.especialidad = especialidades;
    });
  }

  loadAllData() {
    // Agrega un filtro para obtener solo las horas médicas no tomadas
    this.authService.getColaboradorActivo().subscribe((colabActive) => {
      this.colabActive = colabActive.filter(solicitud => !solicitud.tomada);
    });
  }

  aplicarFiltro() {
    // Aplicar el filtro según la especialidad seleccionada y que la hora no esté tomada
    this.authService.getColabActiveByEspecialidad(this.filtroEspecialidad).subscribe((colabActive) => {
      this.colabActive = colabActive.filter(solicitud => !solicitud.tomada);
    });
  }

  resetearFiltro() {
    // Restaurar la lista de horas médicas original sin filtrar
    this.loadAllData();
    this.filtroEspecialidad = '';
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async solicitarServicio(colabActive: solicitud) {
    try {
      const horaExistente = await this.firestore.collection('ColaboradorActivo').doc(colabActive.uid).ref.get();
      const data = horaExistente.data() as any;
  
      if (!data.tomada) {
        // Obtener información del cliente
        const clienteProfile = await this.authService.getUserProfile(colabActive.uidCliente).toPromise();
  
        if (clienteProfile) {
          // Guardar la solicitud tomada en 'ServicioSolicitado'
          await this.firestore.collection('ServicioSolicitado').add({
            nombreCliente: clienteProfile.nombre,
            // Agregar otros datos del cliente según sea necesario
            nombreColaborador: colabActive.nombre,
            // Agrega otros datos necesarios aquí
          });
  
          // Marcar la solicitud como tomada
          await this.firestore.collection('ColaboradorActivo').doc(colabActive.uid).update({ tomada: true });
  
          console.log('La hora médica tomada se ha guardado con éxito en ServicioSolicitado:', colabActive);
          this.helper.presentToast('Servicio solicitado con éxito');
        } else {
          console.error('No se encontró información para el cliente con el UID proporcionado:', colabActive.uidCliente);
        }
      } else {
        console.warn('El servicio ya ha sido tomada anteriormente.');
      }
    } catch (error) {
      console.error('Error al intentar solicitar un servicio:', error);
    }
  }
  
}