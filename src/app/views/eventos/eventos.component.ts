import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
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
}
