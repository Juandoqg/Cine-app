import { IsString, IsNotEmpty, IsDateString, IsUrl, IsInt, Min, IsBoolean } from 'class-validator';

export class PeliculaModelDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsString({ message: 'La categoría debe ser un texto' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  categoria: string;

  @IsUrl({}, { message: 'El tráiler debe ser una URL válida' })
  trailerUrl: string;

  @IsString({ message: 'La imagen debe ser una cadena' })
  @IsNotEmpty({ message: 'La imagen es obligatoria' })
  imagen: string;

  @IsDateString({}, { message: 'La fecha de estreno debe tener formato de fecha (YYYY-MM-DD)' })
  fechaEstreno: string;

  @IsInt({ message: 'La duración debe ser un número entero' })
  @Min(1, { message: 'La duración debe ser al menos de 1 minuto' })
  duracion: number;

  @IsBoolean({ message: 'Proximamente debe ser un valor booleano (true o false)' })
  proximamente: boolean;

  @IsBoolean()
  activo: boolean;
}
