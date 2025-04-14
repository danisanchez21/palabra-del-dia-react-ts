import { useState } from 'react';
import PantallaInicio from './components/PantallaInicio/PantallaInicio';
import SelectorDificultad from './components/SelectorDificultad/SelectorDificultad';
import Juego from './components/Juego/Juego';

function App() {
  const [fase, setFase] = useState<'inicio' | 'selector' | 'juego'>('inicio');
  const [dificultad, setDificultad] = useState<'facil' | 'normal' | 'dificil' | null>(null);

  const iniciarSeleccionDificultad = () => setFase('selector');

  const iniciarJuego = (nivel: 'facil' | 'normal' | 'dificil') => {
    setDificultad(nivel);
    setFase('juego');
  };

  return (
    <div className="App">
      {fase === 'inicio' && <PantallaInicio onJugar={iniciarSeleccionDificultad} />}
      {fase === 'selector' && <SelectorDificultad onSeleccionarDificultad={iniciarJuego} />}
      {fase === 'juego' && dificultad && <Juego dificultad={dificultad} />}
    </div>
  );
}

export default App;
