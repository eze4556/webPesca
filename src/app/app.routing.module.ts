// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ComentariosComponent } from './views/comentarios/comentarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comentarios', component: ComentariosComponent },
  // Otros posibles rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
