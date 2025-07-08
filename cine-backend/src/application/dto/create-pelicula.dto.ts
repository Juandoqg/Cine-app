import { IsString, IsNotEmpty, IsDateString, IsUrl } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsUrl()
  trailerUrl: string;

  @IsString()
  imagen: string;

  @IsDateString()
  fechaEstreno: string;
}
