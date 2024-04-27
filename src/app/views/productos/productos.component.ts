import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[]= []; 
  pageProductos: number = 1;

   apiUrl: string = environment.apiUrl;
  
   

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
    this.getProductos();
  }

//Productos
getProductos(){
 this.http.get<any[]>(`${environment.apiUrl}/producto`).subscribe(
      (response) => {
        this.productos = response;
        console.log('=>',response)
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
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
