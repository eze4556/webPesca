import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

   eventos: any[] = [];
    pageProductos: number = 1;
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private location: Location) { }
  ngOnInit(): void {
    this.getEventos();
  }

 getEventos() {
    this.http.get<any[]>(`${environment.apiUrl}/evento`).subscribe(
      (response) => {
        this.eventos = response;
        console.log('Eventos:', this.eventos);
      },
      (error) => {
        console.error('Error al obtener los eventos:', error);
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
