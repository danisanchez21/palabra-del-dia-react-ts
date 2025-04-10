import styles from './BotonTecla.module.css';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  valor: string;
  onClick: () => void;
  estado?: EstadoLetra; // <- Añade el signo de interrogación
}


const BotonTecla: React.FC<Props> = ({ valor, onClick, estado }) => {
  return (
    <button
      className={`${styles.tecla} ${estado ? styles[estado] : ''}`}
      onClick={onClick}
    >
      {valor}
    </button>
  );
};

export default BotonTecla;
