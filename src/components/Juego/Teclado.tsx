import BotonTecla from './BotonTecla';
import styles from './Teclado.module.css'; // ✅ esta sí va

interface Props {
  onTecla: (letra: string) => void;
  onBorrar: () => void;
  onEnter: () => void;
  estados: Record<string, 'correcta' | 'casi' | 'incorrecta' | undefined>;
}

const filas = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['✔', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const Teclado: React.FC<Props> = ({ onTecla, onBorrar, onEnter, estados }) => {
  return (
    <div className={styles.teclado}>
      {filas.map((fila, i) => (
        <div key={i} className={styles.fila}>
          {fila.map((tecla) => (
            <BotonTecla
              key={tecla}
              valor={tecla}
              onClick={() => {
                if (tecla === '⌫') onBorrar();
                else if (tecla === '✔') onEnter();
                else onTecla(tecla);
              }}
              estado={estados[tecla]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Teclado;
