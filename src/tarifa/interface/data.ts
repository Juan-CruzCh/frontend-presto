export interface DataI {
  nombre: string;
  rangos: DataTarifaI[];
}

export interface DataTarifaI {
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}
