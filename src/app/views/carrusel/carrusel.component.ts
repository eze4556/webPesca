import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  productosNuevos: any[]=[];
  pageProductosNuevos: number = 1;


   apiUrl: string = environment.apiUrl;



  constructor(private http: HttpClient, private location: Location) { }


  ngOnInit(): void {
    this.getProductosNuevos();
  }


  // ProductosNuevos
getProductosNuevos(){
this.http.get<any[]>(`${environment.apiUrl}/nuevoProducto`).subscribe(
      (response) => {
        this.productosNuevos = response;
        console.log('=>',response)
      },
      (error) => {
        console.error('Error al obtener los nuevos productos:', error);
      }
  );
}



volverAtras(): void {
    this.location.back();
  }

detalleVisible: boolean = false;
detalleSeleccionado: any;

mostrarDetalle(elemento: any) {
  this.detalleSeleccionado = elemento;
  this.detalleVisible = true;
}

ocultarDetalle() {
  this.detalleVisible = false;
}



}
