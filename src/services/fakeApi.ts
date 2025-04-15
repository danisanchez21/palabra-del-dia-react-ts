export async function fetchPalabraDelDia(dificultad: 'facil' | 'normal' | 'dificil') {
  const archivosPorDificultad = {
    facil: '/palabras_facil.json',
    normal: '/palabras_normal.json',
    dificil: '/palabras_dificil.json',
  };

  const response = await fetch(archivosPorDificultad[dificultad]);
  const data = await response.json();

  // Elegimos una palabra aleatoria de la lista
  const palabraAleatoria = data[Math.floor(Math.random() * data.length)];

  return {
    palabra: palabraAleatoria.palabra,
    definicion: palabraAleatoria.definicion,
  };
}
