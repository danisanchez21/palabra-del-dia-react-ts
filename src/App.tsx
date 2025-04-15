import { useEffect, useState } from 'react';
import PantallaInicio from './components/PantallaInicio/PantallaInicio';
import SelectorDificultad from './components/SelectorDificultad/SelectorDificultad';
import Juego from './components/Juego/Juego';

function App() {
  const [fase, setFase] = useState<'inicio' | 'selector' | 'juego'>('inicio');
  const [dificultad, setDificultad] = useState<'facil' | 'normal' | 'dificil' | null>(null);
  const [modoClaro, setModoClaro] = useState(false); // oscuro por defecto

  // Cargar preferencia del usuario desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem("modoClaro");
    setModoClaro(guardado === "true");
  }, []);

  // Guardar en localStorage cuando se cambia
  useEffect(() => {
    localStorage.setItem("modoClaro", String(modoClaro));
  }, [modoClaro]);

  const iniciarSeleccionDificultad = () => setFase('selector');

  const iniciarJuego = (nivel: 'facil' | 'normal' | 'dificil') => {
    setDificultad(nivel);
    setFase('juego');
  };

  const estilosApp = modoClaro
    ? 'bg-white text-black'
    : 'bg-black text-white';

  const estilosBoton = modoClaro
    ? 'bg-gray-200 text-black hover:bg-gray-300'
    : 'bg-gray-700 text-white hover:bg-gray-600';

  return (
    <div className={`App min-h-screen transition-colors duration-300 relative ${estilosApp}`}>
      {/* Botón para alternar modo claro/oscuro */}
      <button
        onClick={() => setModoClaro(!modoClaro)}
        className={`absolute top-4 right-4 p-2 rounded transition ${estilosBoton}`}
        aria-label="Cambiar modo"
      >
        {modoClaro ? '🌙' : '☀️'}
      </button>

      {fase === 'inicio' && (
        <PantallaInicio
          onJugar={iniciarSeleccionDificultad}
          modoClaro={modoClaro}
        />
      )}

      {fase === 'selector' && (
        <SelectorDificultad
          onSeleccionarDificultad={iniciarJuego}
          modoClaro={modoClaro}
        />
      )}

      {fase === 'juego' && dificultad && (
        <Juego
          dificultad={dificultad}
          modoClaro={modoClaro}
        />
      )}

    </div>
  );
}

export default App;
