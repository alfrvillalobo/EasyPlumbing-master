import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidePageRoutingModule } from './provide-routing.module';

import { ProvidePage } from './provide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidePageRoutingModule
  ],
  declarations: [ProvidePage]
})
export class ProvidePageModule {}
