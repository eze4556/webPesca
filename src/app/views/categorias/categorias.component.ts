import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  productosFiltrados: any[]= []; 
  pageProductos: number = 1;
  productos: any[]= []
  apiUrl: string = environment.apiUrl;
  categoriaId: any;
  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el valor del parámetro de la URL
    this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      if (this.categoriaId) {
        this.getProductosPorCategoriaId(this.categoriaId).subscribe(
          (productos) => {
            this.productosFiltrados = productos;
            console.log('Productos filtrados:', productos);
          },
          (error) => {
            console.error('Error al obtener productos:', error);
          }
        );
      }
    });
  }
  
  volverAtras(): void {
    this.location.back();
  }

  
  getProductosPorCategoriaId(categoriaId: string): Observable<any[]> {
    console.log(categoriaId)
    // Realizar una solicitud HTTP para obtener los productos de la categoría específica
    return this.http.get<any[]>(`${environment.apiUrl}/producto/categoria/${categoriaId}`);
  }


}
