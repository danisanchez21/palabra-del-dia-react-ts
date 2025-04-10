import Fila from './Fila';
import styles from './Grid.module.css';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

interface Props {
  intentos: LetraIntento[][];
  intentoActual: string[];
  filaActual: number;
  longitudPalabra: number;
}

const Grid: React.FC<Props> = ({ intentos, intentoActual, filaActual, longitudPalabra }) => {
  const renderIntentoActual = (): LetraIntento[] => {
    return Array.from({ length: longitudPalabra }, (_, i) => ({
      letra: intentoActual[i] || '',
      estado: 'pendiente' as EstadoLetra
    }));
  };

  const renderFilas = () => {
    const filas: LetraIntento[][] = [];

    for (let i = 0; i < 6; i++) {
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
    <div className={styles.grid}>
      {renderFilas().map((fila, i) => (
        <Fila key={i} letras={fila} />
      ))}
    </div>
  );
};

export default Grid;
