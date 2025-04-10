import { useState } from 'react';
import PantallaInicio from './components/PantallaInicio';
import Juego from './components/Juego/Juego';


function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  return (
    <div className="App">
      {juegoIniciado ? (
        <Juego />
      ) : (
        <PantallaInicio onJugar={() => setJuegoIniciado(true)} />
      )}
    </div>
  );
}

export default App;
