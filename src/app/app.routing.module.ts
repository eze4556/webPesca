// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ComentariosComponent } from './views/comentarios/comentarios.component';
import { ProductosComponent } from './views/productos/productos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { CarruselComponent } from './views/carrusel/carrusel.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { BarraNavegacionComponent } from './views/barra-navegacion/barra-navegacion.component';
import { QuienesSomosComponent } from './views/quienes-somos/quienes-somos.component';
import { EventosCategoriaComponent } from './views/eventos-categoria/eventos-categoria.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comentarios', component: ComentariosComponent },
  {path: 'productos', component: ProductosComponent},
  {path: 'NuevosProductos', component: CarruselComponent},
  {path: 'categorias/:id', component: CategoriasComponent}
  ,{path: 'eventos/:id', component: EventosComponent}
  ,{path:'eventos1', component: BarraNavegacionComponent}
  ,{path:'sorteo1', component: QuienesSomosComponent},
    { path: 'categoria/:id', component: EventosCategoriaComponent }, // Nueva ruta


  // Otros posibles rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
