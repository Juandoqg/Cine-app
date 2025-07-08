import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UsuarioModelDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString()
  apellido: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^[0-9]{10}$/, {
    message: 'El teléfono debe tener 10 dígitos numéricos',
  })
  telefono: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres',
  })
  password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsString()
  rol: string; // 'cliente' o 'admin'
}
