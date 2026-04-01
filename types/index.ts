export type Modalidad = 'Online' | 'En Vivo' | 'Presencial' | 'Mixta' | 'Asincrónica';

export type Categoria =
  | 'Psicología Clínica y Salud Mental Infantil y Adolescente'
  | 'Psicología Clínica y Salud Mental en la Adultez'
  | 'Educación y Neurodesarrollo'
  | 'Psicología Jurídica y Forense'
  | 'Psicología Organizacional y del Trabajo'
  | 'Neurociencias';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  originalPrice: number;
  discountPrice: number;
  modalidad: Modalidad;
  categoria: Categoria;
  image: string;
  status?: 'En progreso' | 'Próximamente' | 'Nuevo';
}