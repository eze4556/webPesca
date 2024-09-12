import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { CommonModule,DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';








declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers: [DecimalPipe]
})
export class HomeComponent implements OnInit {
  categorias: any[] = [];
  productos: any[]= [];
  eventos: any[]=[];
  productosNuevos: any[]=[];
  sorteos:any[]=[];
  quienes: any[]=[];
  elementosFiltrados: any[] = [];
  comentarios: any[]=[];
   pageProductos: number = 1;
  pageProductosNuevos: number = 1;
  pageSorteos: number = 1;
  pageEventos: number = 1;
   pageComentarios: number = 1;

      filteredNews: any[] = []; // Array para almacenar las noticias filtradas
  searchQuery: string = ''; // Variable que se enlaza con el input de búsqueda

    apiUrl: string = environment.apiUrl;
    googleMapsApiKey: string = environment.googleMapsApiKey;
    mapLoaded: boolean = false;





  constructor(private http: HttpClient,private decimalPipe: DecimalPipe,private router: Router) { }


  ngOnInit(): void {
    this.getCategorias();
    this.getEventos();
    this.getProductos();
    this.getProductosNuevos();
    this.getSorteos();
    this.getQuienes();
    this.getComentarios();
     this.loadGoogleMaps();


  }







sorteoSeleccionado: any;

mostrarDetalleSorteo(sorteo: any) {
    this.sorteoSeleccionado = sorteo;
    this.detalleVisible = true;
  }

  ocultarDetalleSorteo() {
    this.detalleVisible = false;
  }

   irANoticia(id: string): void {
    this.router.navigate(['/eventos', id]);
  }


//MAPAS///
    loadGoogleMaps() {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.onload = () => {
      this.mapLoaded = true;
      if (this.mapLoaded) {
        this.initMap();
      }
    };
    document.body.appendChild(googleMapsScript);
  }

  initMap() {
    const coordinates = { lat: -32.91488437352304, lng: -60.685451429887706 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: coordinates,
    });
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: "Aquí estamos",
    });

  // Agrega un evento de clic al marcador
  marker.addListener('click', () => {
    // Redirige a la ubicación en Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`);
  });
}

//fin mapa




// ******FUNCIONES QUE TRAEN DATOS*******

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
        console.log(' productos =>',response)
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
}



//  getEventos() {
//     this.http.get<any[]>(`${environment.apiUrl}/evento`).subscribe(
//       (response) => {
//         this.eventos = response;
//         this.filteredNews = response; // Inicialmente muestra todas las noticias
//         console.log('Eventos =>', response);
//       },
//       (error) => {
//         console.error('Error al obtener los eventos:', error);
//       }
//     );
//   }


getEventos(categoriaId?: string) {
    let url = `${environment.apiUrl}/evento`;

    // Si se pasa un id de categoría, filtra por esa categoría
    if (categoriaId) {
        url += `?categoriaId=${categoriaId}`;
    }

    this.http.get<any[]>(url).subscribe(
        (response) => {
            // Si se pasa una categoría, filtra eventos que contengan esa categoría
            if (categoriaId) {
                this.eventos = response.filter(evento => evento.categorias.includes(categoriaId));
            } else {
                // Si no, muestra todos los eventos
                this.eventos = response;
            }

            this.filteredNews = this.eventos; // Inicialmente muestra todas las noticias
            console.log('Eventos filtrados =>', this.eventos);
        },
        (error) => {
            console.error('Error al obtener los eventos:', error);
        }
    );
}





filtroporletra() {
  const query = this.searchQuery.toLowerCase();

  // Si no hay texto en la barra de búsqueda, mostrar todas las noticias
  if (query === '') {
    this.filteredNews = this.eventos;
  } else {
    // Si hay texto en la barra, aplicar el filtro
    this.filteredNews = this.eventos.filter((evento) =>
      evento.titulo && evento.titulo.toLowerCase().startsWith(query)
    );
  }
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
//COMENTARIOS
getComentarios(){
  this.http.get<any[]>(`${environment.apiUrl}/comentario`).subscribe(
        (response) => {
          this.comentarios = response;
          console.log('=>',response)
        },
        (error) => {
          console.error('Error al obtener los comentarios:', error);
        }
      );
  }


    formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.2-2') ?? '0.00';
  }

//BARRA BUSQUEDA

// Función para buscar elementos en todas las secciones
  buscarElemento(event: Event) {
    const termino = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtrar elementos en todas las secciones
    this.elementosFiltrados = [];

      // Filtrar productos
  this.elementosFiltrados = this.productos.filter(producto => {
    const incluido = producto.nombre.toLowerCase().includes(termino);
    console.log('Producto:', producto.nombre, 'Incluido:', incluido);
    return incluido;
  })

  }

 limpiarBusqueda() {
    this.elementosFiltrados = []; // Vacía la lista de elementos filtrados
    const inputElement = document.querySelector('.search-bar input') as HTMLInputElement | null;
    if (inputElement) {
        inputElement.value = '';
    }  }

getStars(puntuacion: number): number[] {
  return Array(puntuacion).fill(0).map((_, index) => index);
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
