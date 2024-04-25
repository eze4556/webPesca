import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  apiUrl = 'http://localhost:5000/comentario'; // Cambia la URL según corresponda

  constructor(private http: HttpClient) { }

  createComentario(comentario: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, comentario).pipe(
      catchError(this.handleError)
    );
  }

  getAllComentarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

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
