import { useEffect, useState, useCallback } from 'react';
import { fetchPalabraDelDia } from '../../services/fakeApi';
import Grid from './Grid';
import Teclado from './Teclado';
import confetti from 'canvas-confetti';

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

  intento.forEach((letra, i) => {
    if (letra === letrasObjetivo[i]) {
      resultado[i] = { letra, estado: 'correcta' };
      letrasEvaluadas[i] = '';
    } else {
      resultado[i] = { letra, estado: 'pendiente' };
    }
  });

  resultado.forEach((item) => {
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
  const [definicion, setDefinicion] = useState<string | null>(null);
  const [intentos, setIntentos] = useState<LetraIntento[][]>([]);
  const [intentoActual, setIntentoActual] = useState<string[]>([]);
  const [filaActual, setFilaActual] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'ganado' | 'perdido'>('jugando');
  const [teclasEstado, setTeclasEstado] = useState<Record<string, EstadoLetra | undefined>>({});

  const procesarIntento = useCallback(() => {
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

    setFilaActual((prev) => prev + 1);
    setIntentoActual([]);
  }, [palabraDelDia, intentoActual, intentos, teclasEstado]);

  useEffect(() => {
    fetchPalabraDelDia().then((data) => {
      setPalabraDelDia(data.palabra.toUpperCase());
      setDefinicion(data.definicion ?? null);
    });
  }, []);

  useEffect(() => {
    const manejarTecla = (e: KeyboardEvent) => {
      if (estadoJuego !== 'jugando') return;

      const tecla = e.key.toUpperCase();

      if (tecla === 'ENTER' && intentoActual.length === palabraDelDia.length) {
        procesarIntento();
      } else if (tecla === 'BACKSPACE') {
        setIntentoActual((prev) => prev.slice(0, -1));
      } else if (/^[A-ZÑ]$/.test(tecla)) {
        if (intentoActual.length < palabraDelDia.length) {
          setIntentoActual((prev) => [...prev, tecla]);
        }
      }
    };

    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [estadoJuego, intentoActual.length, palabraDelDia.length, procesarIntento]);

  useEffect(() => {
    if (estadoJuego === 'ganado') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [estadoJuego]);
  
  const reiniciarJuego = () => {
    setIntentos([]);
    setIntentoActual([]);
    setFilaActual(0);
    setEstadoJuego('jugando');
    setTeclasEstado({});

    fetchPalabraDelDia().then((data) => {
      setPalabraDelDia(data.palabra.toUpperCase());
      setDefinicion(data.definicion ?? null);
    });
  };

  return (
    <div className="text-white max-w-xl mx-auto text-center space-y-4 px-4">
      <h2 className="text-2xl font-bold">La Palabra del Día</h2>

      <p
        className={
          estadoJuego === 'ganado'
            ? "bg-green-100 text-green-700 border border-green-400 rounded p-4 text-lg font-medium"
            : estadoJuego === 'perdido'
            ? "bg-red-100 text-red-700 border border-red-400 rounded p-4 text-lg font-medium"
            : "text-white text-lg"
        }
      >
        {estadoJuego === 'jugando' ? (
          '¡Intenta adivinar!'
        ) : estadoJuego === 'ganado' ? (
          <>
            🎉 ¡Muy bien, has ganado! Efectivamente es{' '}
            <span className="font-bold">{palabraDelDia}</span>
          </>
        ) : (
          <>
            ❌ Upss, has perdido. La palabra correcta es{' '}
            <span className="font-bold">{palabraDelDia}</span>
          </>
        )}
      </p>

      {estadoJuego !== 'jugando' && definicion && (
        <p><strong>Definición:</strong> {definicion}</p>
      )}

      {estadoJuego !== 'jugando' && (
        <button
          onClick={reiniciarJuego}
          className="mt-4 bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded transition"
        >
          🔁 Reiniciar juego
        </button>
      )}

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
          procesarIntento();
        }}
        estados={teclasEstado}
      />
    </div>
  );
};

export default Juego;
