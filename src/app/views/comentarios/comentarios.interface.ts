export interface Comentario {
  _id?: string;
  nombre: string;
  comentario: string;
  puntuacion?: string;
  puntuacionSeleccionada?: number; // Agrega esta propiedad
}
