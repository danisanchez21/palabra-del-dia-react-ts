import LetraCelda from './LetraCelda';
import styles from './Fila.module.css';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

interface Props {
  letras: LetraIntento[];
}

const Fila: React.FC<Props> = ({ letras }) => {
  return (
    <div className={styles.fila}>
      {letras.map((l, i) => (
        <LetraCelda key={i} letra={l.letra} estado={l.estado} />
      ))}
    </div>
  );
};

export default Fila;
