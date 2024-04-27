// comentario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comentario } from '../comentarios/comentarios.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = `${environment.apiUrl}/comentario`;

  constructor(private http: HttpClient) { }

  // Obtener todos los comentarios
   getAllComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }
  
 
 // Crear un nuevo comentario
  createComentario(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body); 
  }

  // Eliminar un comentario por su id
  deleteComentario(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    throw error;
  }
}