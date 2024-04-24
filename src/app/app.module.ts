import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './views/barra-navegacion/barra-navegacion.component';
import { CarruselComponent } from './views/carrusel/carrusel.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { QuienesSomosComponent } from './views/quienes-somos/quienes-somos.component';
import { ProductosComponent } from './views/productos/productos.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';



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
  
  ],
  imports: [
    BrowserModule,
     HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
