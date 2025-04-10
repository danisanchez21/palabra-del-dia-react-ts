import React from 'react';
import styles from './PantallaInicio.module.css';

interface Props {
  onJugar: () => void;
}

const PantallaInicio: React.FC<Props> = ({ onJugar }) => {
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>
        <span className={styles.caja}>L</span>
        <span className={styles.caja}>A</span>
        &nbsp;
        <span className={styles.cajaVerde}>P</span>
        <span className={styles.cajaVerde}>A</span>
        <span className={styles.cajaVerde}>L</span>
        <span className={styles.cajaVerde}>A</span>
        <span className={styles.cajaVerde}>B</span>
        <span className={styles.cajaVerde}>R</span>
        <span className={styles.cajaVerde}>A</span>
        &nbsp;
        <span className={styles.caja}>D</span>
        <span className={styles.caja}>E</span>
        <span className={styles.caja}>L</span>
        &nbsp;
        <span className={styles.cajaAmarilla}>D</span>
        <span className={styles.cajaAmarilla}>Í</span>
        <span className={styles.cajaAmarilla}>A</span>
      </h1>

      <div className={styles.texto}>
        <p>¿Listo para el reto? Tienes 6 intentos para descubrir la palabra secreta.</p>
        <p>
          Cada palabra que pruebes debe ser válida. Si no lo es, se te avisará para que lo intentes de nuevo.
        </p>
        <p>
          Al enviar una palabra, verás cómo cambian los colores de las letras. Esto te dará pistas sobre qué tan cerca estás de acertar:
        </p>

        <ul>
          <li><span className={styles.verde}>VERDE</span>: La letra está en el lugar <strong>exacto</strong>.</li>
          <li><span className={styles.amarillo}>AMARILLO</span>: La letra está en la palabra, pero en una <strong>posición distinta</strong>.</li>
          <li><span className={styles.gris}>GRIS</span>: Esa letra <strong>no aparece</strong> en la palabra.</li>
        </ul>

        <p>¿Te atreves? Cada día hay una nueva palabra para resolver.</p>
      </div>

      <button className={styles.boton} onClick={onJugar}>¡Jugar!</button>
    </div>
  );
};

export default PantallaInicio;
