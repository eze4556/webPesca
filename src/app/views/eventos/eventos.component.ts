import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, AfterViewInit {
  eventos: any[] = [];
  apiUrl: string = environment.apiUrl;
  currentSlideIndex = 0;
  interval: any;
  categorias: any[] = [];
  quienes: any[]=[];
    eventoId: any;
     currentUrl: string;
       clima: any = {};




  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(private http: HttpClient,private location: Location, private route: ActivatedRoute, private router: Router) {    this.currentUrl = this.router.url; // Asegúrate de obtener la URL actual correctamente
 }


  ngOnInit(): void {
 // Obtener el valor del parámetro de la URL
  this.route.paramMap.subscribe(params => {
    this.eventoId = params.get('id');
    if (this.eventoId) {
      this.getEventosPorId(this.eventoId).subscribe(
        (evento) => {
          this.eventos = [evento]; // Si se encuentra el evento, lo guardamos en un array
          console.log('Evento filtrado:', evento);
        },
        (error) => {
          console.error('Error al obtener el evento:', error);
        }
      );
    } else {
      this.getEventos();  // Si no hay `eventoId`, obtenemos todos los eventos
    }
  });
    this.getEventos();
    this.getCategorias();
    this.getQuienes();
        this.obtenerClima();

  }


obtenerClima() {
  // Verificar si el navegador soporta geolocalización
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = '7d2f82f2297305d38399ce32062d2708'; // Aquí va tu API key de OpenWeatherMap
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=es`;

      this.http.get(url).subscribe((data: any) => {
        this.clima = {
          ciudad: data.name,
          temperatura: data.main.temp,
          condiciones: data.weather[0].description,
          icono: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };
      });
    }, (error) => {
      console.error('Error al obtener la ubicación: ', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje predeterminado
    });
  } else {
    console.error('La geolocalización no está soportada por este navegador.');
    // Aquí podrías poner una ciudad por defecto si no se puede obtener la ubicación
  }
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


  ngAfterViewInit(): void {
    this.startCarousel();
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

  startCarousel() {
    this.interval = setInterval(() => {
      if (this.carousel && this.carousel.nativeElement) {
        const nextIndex = (this.currentSlideIndex + 1) % this.eventos.length;
        const nextSlide = this.carousel.nativeElement.querySelector(`.carousel-item:nth-child(${nextIndex + 1})`);
        const currentSlide = this.carousel.nativeElement.querySelector('.carousel-item.active');
        if (nextSlide && currentSlide) {
          currentSlide.classList.remove('active');
          nextSlide.classList.add('active');
          this.currentSlideIndex = nextIndex;
        } else {
          // Si no hay siguiente diapositiva, vuelve al primer índice
          const firstSlide = this.carousel.nativeElement.querySelector('.carousel-item:first-child');
          if (firstSlide && currentSlide) {
            currentSlide.classList.remove('active');
            firstSlide.classList.add('active');
            this.currentSlideIndex = 0;
          }
        }
      }
    }, 10000); // Cambiar las imágenes cada 10 segundos (ajusta el tiempo según sea necesario)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

getEventosPorId(eventoId: string): Observable<any> {  // Cambiamos el tipo de retorno a `Observable<any>`
  console.log(eventoId);
  return this.http.get<any>(`${environment.apiUrl}/evento/${eventoId}`);
}


}
