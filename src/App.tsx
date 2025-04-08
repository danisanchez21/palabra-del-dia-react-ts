import { useState } from 'react';
import PantallaInicio from './components/PantallaInicio';

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  return (
    <div className="App">
      {juegoIniciado ? (
        <p>Componente del juego</p>
      ) : (
        <PantallaInicio onJugar={() => setJuegoIniciado(true)} />
      )}
    </div>
  );
}

export default App;
