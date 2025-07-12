export class Venta {
  constructor(
    public readonly id: number,
    public readonly clienteId: number,
    public readonly funcionId: number,
    public readonly tipoPagoId: number,
    public readonly cantidadTickets: number,
    public readonly total: number,
    public readonly fecha: Date,
  ) {}
}
