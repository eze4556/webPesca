import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentarios.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ComentarioService {
  headers: HttpHeaders = new HttpHeaders;
  private apiUrl = `${environment.apiUrl}/comentario`;

  constructor(private http: HttpClient) { }

  getAllComentario(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }


  createComentario(comentario: FormData): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }


  deleteComentario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
