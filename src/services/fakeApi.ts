import { PalabraDelDia } from '../types/palabra';

export const fetchPalabraDelDia = async (): Promise<PalabraDelDia> => {
  const res = await fetch('/palabra.json');
  const lista: PalabraDelDia[] = await res.json();
  const aleatoria = lista[Math.floor(Math.random() * lista.length)];
  return aleatoria;
};
