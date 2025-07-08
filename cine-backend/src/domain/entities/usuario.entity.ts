export class Usuario {
  constructor(
    public readonly id: number,
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: string,
    public password: string,
    public activo: boolean = true,
    public rol: string
  ) {}
}
