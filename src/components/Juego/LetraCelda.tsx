import styles from './LetraCelda.module.css';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  letra: string;
  estado?: EstadoLetra;
  animada?: boolean;
}

const LetraCelda: React.FC<Props> = ({ letra, estado = 'pendiente', animada = false }) => {
  return (
    <div className={`${styles.celda} ${styles[estado]} ${animada ? styles.animada : ''}`}>
      {letra}
    </div>
  );
};

export default LetraCelda;
