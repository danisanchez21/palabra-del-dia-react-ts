import { useEffect, useState } from 'react';
import { fetchPalabraDelDia } from '../../services/fakeApi';
import { PalabraDelDia } from '../../types/palabra';
import Grid from './Grid';
import Teclado from './Teclado';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta'; //| 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

const MAX_INTENTOS = 6;

const Juego: React.FC = () => {
  const [palabraDelDia, setPalabraDelDia] = useState<string>('');
  const [intentos, setIntentos] = useState<LetraIntento[][]>([]);
  const [intentoActual, setIntentoActual] = useState<string[]>([]);
  const [filaActual, setFilaActual] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'ganado' | 'perdido'>('jugando');
  const [teclasEstado, setTeclasEstado] = useState<Record<string, EstadoLetra>>({});

  useEffect(() => {
    fetchPalabraDelDia().then((data) => {
      setPalabraDelDia(data.palabra.toUpperCase());
    });
  }, []);

  useEffect(() => {
    console.log('✅ Juego renderizado');
  }, []);

  return (
    <div>
      <h2>La Palabra del Día</h2>
      <p>
        {estadoJuego === 'jugando'
          ? '¡Intenta adivinar!'
          : estadoJuego === 'ganado'
          ? '¡Has ganado!'
          : `Perdiste. Era ${palabraDelDia}`}
      </p>

      <Grid
        intentos={intentos}
        intentoActual={intentoActual}
        filaActual={filaActual}
        longitudPalabra={palabraDelDia.length}
      />

      {/* DEBUG para confirmar visibilidad del teclado
      <p style={{ color: 'white', textAlign: 'center' }}>DEBUG: El teclado debería ir justo debajo 👇</p> */}

      <Teclado
        onTecla={(letra) => {
          if (
            intentoActual.length < palabraDelDia.length &&
            estadoJuego === 'jugando'
          ) {
            setIntentoActual([...intentoActual, letra]);
          }
        }}
        onBorrar={() => {
          if (estadoJuego === 'jugando') {
            setIntentoActual((prev) => prev.slice(0, -1));
          }
        }}
        onEnter={() => {
          if (estadoJuego !== 'jugando') return;
          if (intentoActual.length !== palabraDelDia.length) return;

          console.log('Intentar validar:', intentoActual.join(''));
          // Lógica de validación irá aquí
        }}
        estados={teclasEstado}
      />
    </div>
  );
};

export default Juego;
