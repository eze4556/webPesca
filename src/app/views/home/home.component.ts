import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias: any[] = [];
  productos: any[]= []; 
  eventos: any[]=[];
  productosNuevos: any[]=[];
  sorteos:any[]=[];
  
    apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getEventos();
    this.getProductos();
    this.getProductosNuevos();
    this.getSorteos();
  }
   

//categorias

 getCategorias() {
    this.http.get<any[]>(`${environment.apiUrl}/categoria`).subscribe(
      (response) => {
        this.categorias = response;
        console.log('=>',response)
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
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


// Eventos
getEventos(){
this.http.get<any[]>(`${environment.apiUrl}/evento`).subscribe(
      (response) => {
        this.eventos = response;
        console.log('=>',response)
      },
      (error) => {
        console.error('Error al obtener los eventos:', error);
      }
    );
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

// SORTEO

getSorteos(){
this.http.get<any[]>(`${environment.apiUrl}/sorteo`).subscribe(
      (response) => {
        this.sorteos= response;
        console.log('=>',response)
      },
      (error) => {
        console.error('Error al obtener los sorteos:', error);
      }
  );
}





}
