import Fila from './Fila';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

interface Props {
  modoClaro: boolean;
  intentos: LetraIntento[][];
  intentoActual: string[];
  filaActual: number;
  longitudPalabra: number;
  maxIntentos: number;
}

const Grid: React.FC<Props> = ({ intentos, intentoActual, filaActual, longitudPalabra, maxIntentos, modoClaro }) => {

  const renderIntentoActual = (): LetraIntento[] => {
    return Array.from({ length: longitudPalabra }, (_, i) => ({
      letra: intentoActual[i] || '',
      estado: 'pendiente' as EstadoLetra
    }));
  };

  const renderFilas = () => {
    const filas: LetraIntento[][] = [];

 for (let i = 0; i < maxIntentos; i++) {
      if (i < intentos.length) {
        filas.push(intentos[i]);
      } else if (i === filaActual) {
        filas.push(renderIntentoActual());
      } else {
        filas.push(Array.from({ length: longitudPalabra }, () => ({ letra: '', estado: 'pendiente' })));
      }
    }

    return filas;
  };

  return (
    <div className="flex flex-col items-center gap-[0.2rem] mt-8">
      {renderFilas().map((fila, i) => (
        <Fila key={i} letras={fila} modoClaro={modoClaro} />
      ))}
    </div>
  );
};

export default Grid;
