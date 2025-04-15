import { useEffect, useState } from 'react';
import PantallaInicio from './components/PantallaInicio/PantallaInicio';
import SelectorDificultad from './components/SelectorDificultad/SelectorDificultad';
import Juego from './components/Juego/Juego';

function App() {
  const [fase, setFase] = useState<'inicio' | 'selector' | 'juego'>('inicio');
  const [dificultad, setDificultad] = useState<'facil' | 'normal' | 'dificil' | null>(null);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Cargar preferencia del usuario desde localStorage
  useEffect(() => {
    const modoGuardado = localStorage.getItem("modoOscuro");
    setModoOscuro(modoGuardado === "true");
  }, []);

  // Aplicar clase dark al <html> según el estado
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("modoOscuro", String(modoOscuro));
  }, [modoOscuro]);

  const iniciarSeleccionDificultad = () => setFase('selector');

  const iniciarJuego = (nivel: 'facil' | 'normal' | 'dificil') => {
    setDificultad(nivel);
    setFase('juego');
  };

  return (
    <div className="App min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Botón para alternar modo claro/oscuro */}
      <button
        onClick={() => setModoOscuro(!modoOscuro)}
        className="absolute top-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        aria-label="Cambiar modo"
      >
        {modoOscuro ? '☀️' : '🌙'}
      </button>

      {fase === 'inicio' && <PantallaInicio onJugar={iniciarSeleccionDificultad} />}
      {fase === 'selector' && <SelectorDificultad onSeleccionarDificultad={iniciarJuego} />}
      {fase === 'juego' && dificultad && <Juego dificultad={dificultad} />}
    </div>
  );
}

export default App;
