export class Pelicula {
  constructor(
    public readonly id: number,
    public titulo: string,
    public descripcion: string,
    public categoria: string,
    public trailerUrl: string,
    public imagen: string,
    public fechaEstreno: Date,
    public duracion: number,
    public proximamente: boolean = false,
    public activo: boolean = true,
  ) {}
}
