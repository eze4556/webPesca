import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './views/barra-navegacion/barra-navegacion.component';
import { CarruselComponent } from './views/carrusel/carrusel.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { QuienesSomosComponent } from './views/quienes-somos/quienes-somos.component';
import { ProductosComponent } from './views/productos/productos.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ComentariosComponent } from './views/comentarios/comentarios.component';
import { AppRoutingModule } from './app.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    CarruselComponent,
    CategoriasComponent,
    QuienesSomosComponent,
    ProductosComponent,
    EventosComponent,
    HomeComponent,
    ComentariosComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
