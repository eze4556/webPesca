import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';




@Component({
  selector: 'app-eventos-categoria',
  templateUrl: './eventos-categoria.component.html',
  styleUrls: ['./eventos-categoria.component.css'],
   providers: [DecimalPipe]
})
export class EventosCategoriaComponent implements OnInit {
  eventos: any[] = [];
  categoriaId: string = '';
   categorias: any[] = [];
  quienes: any[]=[];


 filteredNews: any[] = []; // Array para almacenar las noticias filtradas
  searchQuery: string = ''; // Variable que se enlaza con el input de búsqueda

    apiUrl: string = environment.apiUrl;
   


  constructor(private route: ActivatedRoute, private http: HttpClient,private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {


   this.getCategorias();

    this.getQuienes();




    // Obtener el id de la categoría desde la URL
    this.categoriaId = this.route.snapshot.paramMap.get('id') || '';

    // Llamar al método para obtener los eventos filtrados
    if (this.categoriaId) {
      this.getEventosPorCategoria(this.categoriaId);
    }
  }

  getEventosPorCategoria(categoriaId: string) {
    this.http.get<any[]>(`${environment.apiUrl}/evento?categoriaId=${categoriaId}`).subscribe(
      (response) => {
        this.eventos = response.filter(evento => evento.categorias.includes(categoriaId));
        console.log('Eventos por categoría =>', this.eventos);
      },
      (error) => {
        console.error('Error al obtener los eventos:', error);
      }
    );
  }


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

//QUIENES SOMOS
getQuienes(){
this.http.get<any[]>(`${environment.apiUrl}/quienesSomos`).subscribe(
      (response) => {
        this.quienes= response;
        console.log('somos =>',response)
      },
      (error) => {
        console.error('Error al obtener los quienes somos:', error);
      }
  );
}




}
