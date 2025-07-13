
export class Funcion {
  constructor(
    public readonly id: number,
    public peliculaId: string,
    public salaId: string,
    public fecha: Date,
    public hora: string,
    public precio: number,
    public activo: boolean = true, 

  ) {}
}
