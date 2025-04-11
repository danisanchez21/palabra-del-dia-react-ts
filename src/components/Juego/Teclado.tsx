import BotonTecla from './BotonTecla';

interface Props {
  onTecla: (letra: string) => void;
  onBorrar: () => void;
  onEnter: () => void;
  estados: Record<string, 'correcta' | 'casi' | 'incorrecta' | 'pendiente' | undefined>;
}

const filas = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['✔', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const Teclado: React.FC<Props> = ({ onTecla, onBorrar, onEnter, estados }) => {
  return (
    <div className="flex flex-col items-center mt-7 gap-2">
      {filas.map((fila, i) => (
        <div key={i} className="flex justify-center gap-1">
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
