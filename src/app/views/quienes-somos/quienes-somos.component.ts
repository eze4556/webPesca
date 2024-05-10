import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';



@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

 constructor(private http: HttpClient, private location: Location) { }

 sorteos: any[] = [];
   pageProductos: number = 1;
  apiUrl: string = environment.apiUrl;


  ngOnInit(): void {
    this.getSorteos();
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


toggleDescripcion(producto: any) {
    producto.expandido = !producto.expandido;
}



volverAtras(): void {
    this.location.back();
  }



}
