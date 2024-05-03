import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../comentarios/comentarios.services';
import { Router } from '@angular/router';
import { Comentario } from '../comentarios/comentarios.interface';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


declare var setPuntuacion: (puntuacion: number) => void;

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarioForm: FormGroup;
  puntuacionSeleccionada: number | null = null;
  apiUrl: string = environment.apiUrl;
  
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    
   
    private comentarioService: ComentarioService
  ) {
    this.comentarioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      puntuacion: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  volverAtras(): void {
    this.location.back();
  }

// setPuntuacion(puntuacion: number): void {
//   console.log('Seleccionada puntuación:', puntuacion);
//   this.puntuacionSeleccionada = puntuacion;
//   console.log('puntuacionSeleccionada después de establecerla:', this.puntuacionSeleccionada);
// }


setPuntuacion(puntuacion: number): void {
  console.log('Seleccionada puntuación:', puntuacion);
  this.puntuacionSeleccionada = puntuacion;
  console.log('puntuacionSeleccionada después de establecerla:', this.puntuacionSeleccionada);
  for (let i = 1; i <= puntuacion; i++) {
    const starElement = document.getElementById(`star-${i}`) as HTMLSpanElement;
    if (starElement) {
      starElement.classList.add('selected');
    }
  }
}


agregarComentario(): void {
  console.log('Agregando comentario');
  const nombre = this.comentarioForm.get('nombre')?.value;
  const descripcion = this.comentarioForm.get('descripcion')?.value;
  const puntuacion = this.puntuacionSeleccionada;

  console.log('Nombre:', nombre);
  console.log('Descripción:', descripcion);
  console.log('Puntuación:', puntuacion);

  if (nombre.trim() !== '' && descripcion.trim() !== '' && puntuacion !== null) {
    console.log('Datos del comentario válidos');
    const nuevoComentario: Comentario = {
      nombre,
      descripcion,
      puntuacion
    };

    this.comentarioService.createComentario(nuevoComentario).subscribe({
      next: () => {
        console.log('Comentario agregado correctamente');
        this.router.navigate(['/'])
        // Limpiar el formulario después de agregar el comentario
        this.comentarioForm.reset();
        this.puntuacionSeleccionada = null;
      },
      error: (err) => {
        console.error('Error al agregar el comentario:', err);
        // Manejar el error según sea necesario
      }
    });
  } else {
    console.log('Datos del comentario no válidos');
  }
}
}
