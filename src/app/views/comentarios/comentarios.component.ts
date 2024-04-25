import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from './comentarios.services';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarioForm: FormGroup ;
  id: string | null;
  constructor(private fb: FormBuilder,
    private comentarioService: ComentarioService,
    private activatedRoute: ActivatedRoute) {
      this.comentarioForm = this.fb.group({
        nombre: ['', Validators.required],
        puntuacion: ['', Validators.required], 
        descripcion: ['', Validators.required],     
      });
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
  }
  goBack() {
    window.history.back();
  }

  agregarComentario(): void {
    const nombre = this.comentarioForm.get('nombre')?.value;
    const descripcion = this.comentarioForm.get('descripcion')?.value;
    const puntuacion = this.comentarioForm.get('puntuacion')?.value;

    if (nombre && descripcion && puntuacion) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('puntuacion', puntuacion);
        console.log('FormData:', formData);

      this.comentarioService.createComentario(formData).subscribe({
        next: (response) => {
          console.log('Comentario creado correctamente:', response);
        },
        error: (err) => {
          console.error('Error al crear el comentario:', err);
          // Manejar el error según sea necesario
        }
      });
    }
  }
}
