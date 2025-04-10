import styles from './BotonTecla.module.css';

interface Props {
  valor: string;
  onClick: () => void;
  estado?: 'correcta' | 'casi' | 'incorrecta';
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
