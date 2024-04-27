import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'Menu',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'SolicitarServicio',
        loadChildren: () => import('../../pages/request/request.module').then(m => m.RequestPageModule),
      },
      {
        path: 'ActivarColab',
        loadChildren: () => import('../../pages/provide/provide.module').then(m => m.ProvidePageModule)
      },
      {
        path: 'SoliColab',
        loadChildren: () => import('../../pages/solicitudes-colab/solicitudes-colab.module').then(m => m.SolicitudesColabPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
