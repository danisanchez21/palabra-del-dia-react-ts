import { useEffect, useState } from 'react';
import { fetchPalabraDelDia } from '../../services/fakeApi';
import { PalabraDelDia } from '../../types/palabra';
import Grid from './Grid';
import Teclado from './Teclado';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

const MAX_INTENTOS = 6;

function validarIntento(palabra: string, intento: string[]): LetraIntento[] {
  const resultado: LetraIntento[] = [];
  const letrasObjetivo = palabra.split('');
  const letrasEvaluadas = [...letrasObjetivo];

  // Paso 1: letras correctas
  intento.forEach((letra, i) => {
    if (letra === letrasObjetivo[i]) {
      resultado[i] = { letra, estado: 'correcta' };
      letrasEvaluadas[i] = '';
    } else {
      resultado[i] = { letra, estado: 'pendiente' };
    }
  });

  // Paso 2: letras casi
  resultado.forEach((item, i) => {
    if (item.estado === 'pendiente') {
      const index = letrasEvaluadas.indexOf(item.letra);
      if (index !== -1) {
        item.estado = 'casi';
        letrasEvaluadas[index] = '';
      } else {
        item.estado = 'incorrecta';
      }
    }
  });

  return resultado;
}

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

          const resultado = validarIntento(palabraDelDia, intentoActual);
          const nuevosIntentos = [...intentos, resultado];
          setIntentos(nuevosIntentos);

          const nuevosEstados = { ...teclasEstado };
          resultado.forEach(({ letra, estado }) => {
            const estadoActual = nuevosEstados[letra];
            const prioridad = { 'correcta': 3, 'casi': 2, 'incorrecta': 1, 'pendiente': 0 };

            if (!estadoActual || prioridad[estado] > prioridad[estadoActual]) {
              nuevosEstados[letra] = estado;
            }
          });
          setTeclasEstado(nuevosEstados);

          if (resultado.every((l) => l.estado === 'correcta')) {
            setEstadoJuego('ganado');
            return;
          }

          if (nuevosIntentos.length >= MAX_INTENTOS) {
            setEstadoJuego('perdido');
            return;
          }

          setFilaActual(filaActual + 1);
          setIntentoActual([]);
        }}
        estados={teclasEstado}
      />
    </div>
  );
};

export default Juego;
