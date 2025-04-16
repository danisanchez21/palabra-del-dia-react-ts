import { useEffect, useState } from 'react';
import PantallaInicio from './components/PantallaInicio/PantallaInicio';
import SelectorDificultad from './components/SelectorDificultad/SelectorDificultad';
import Juego from './components/Juego/Juego';

/**
 * 🌙☀️ Modo claro/oscuro automático y temporal
 *
 * - Se detecta el tema del sistema al iniciar (modo claro u oscuro)
 * - Se actualiza automáticamente si el usuario cambia el tema en su sistema (Windows/macOS)
 * - El botón permite cambiar de modo solo durante esta sesión
 * - NO se guarda nada en localStorage, todo se resetea al cerrar la pestaña
 *
 * Se respeta el sistema, pero se da control al usuario en la sesión.
 */

function App() {
  const [fase, setFase] = useState<'inicio' | 'selector' | 'juego'>('inicio');
  const [dificultad, setDificultad] = useState<'facil' | 'normal' | 'dificil' | null>(null);
  const [modoClaro, setModoClaro] = useState<boolean | null>(null);

  // Detectar el tema del sistema al cargar
  useEffect(() => {
    const sistemaClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
    setModoClaro(sistemaClaro);
  }, []);

  // Escuchar cambios en el tema del sistema en vivo
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      setModoClaro(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Aplicar clases al body
  useEffect(() => {
    if (modoClaro !== null) {
      document.body.classList.toggle('modo-claro', modoClaro);
      document.body.classList.toggle('modo-oscuro', !modoClaro);
    }
  }, [modoClaro]);

  const iniciarSeleccionDificultad = () => setFase('selector');
  const iniciarJuego = (nivel: 'facil' | 'normal' | 'dificil') => {
    setDificultad(nivel);
    setFase('juego');
  };

  const estilosApp = modoClaro === null
    ? ''
    : modoClaro
    ? 'bg-[#f5f5dc] text-black'
    : 'bg-[#121213] text-white';

  const estilosBoton = modoClaro === null
    ? ''
    : modoClaro
    ? 'bg-gray-200 text-black hover:bg-gray-300'
    : 'bg-gray-700 text-white hover:bg-gray-600';

  // Botón cambia modo solo en memoria (no persistente)
  const alternarModo = () => {
    setModoClaro(prev => !prev);
  };

  return (
    <div className={`App min-h-screen transition-colors duration-300 relative ${estilosApp}`}>
      {modoClaro !== null && (
        <button
          onClick={alternarModo}
          className={`absolute top-4 right-4 p-2 rounded transition ${estilosBoton}`}
          aria-label="Cambiar modo"
        >
          {modoClaro ? '🌙' : '☀️'}
        </button>
      )}

      {fase === 'inicio' && modoClaro !== null && (
        <PantallaInicio onJugar={iniciarSeleccionDificultad} modoClaro={modoClaro} />
      )}

      {fase === 'selector' && modoClaro !== null && (
        <SelectorDificultad onSeleccionarDificultad={iniciarJuego} modoClaro={modoClaro} />
      )}

      {fase === 'juego' && dificultad && modoClaro !== null && (
        <Juego dificultad={dificultad} modoClaro={modoClaro} />
      )}
    </div>
  );
}

export default App;
