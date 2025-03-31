export interface CrearUsuarioI {
  ci: string;
  nombre: string;

  apellidoMaterno?: string;

  apellidoPaterno: string;

  usuario: string;

  password: string;
  password2?: string;

  direccion: string;

  celular: string;

  rol: string;
}
