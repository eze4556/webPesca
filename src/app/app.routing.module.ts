// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ComentariosComponent } from './views/comentarios/comentarios.component';
import { ProductosComponent } from './views/productos/productos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { CarruselComponent } from './views/carrusel/carrusel.component';
import { EventosComponent } from './views/eventos/eventos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comentarios', component: ComentariosComponent },
  {path: 'productos', component: ProductosComponent},
  {path: 'NuevosProductos', component: CarruselComponent},
  {path: 'categoria/:id', component: CategoriasComponent}
  ,{path: 'eventos', component: EventosComponent}
  // Otros posibles rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
