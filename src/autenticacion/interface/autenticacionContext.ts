export interface AutenticacionContextI {
  token: string | undefined;
  isAutenticacion: boolean;
  setToken: (token: string) => void;
  cerrarSession: () => void;
}
