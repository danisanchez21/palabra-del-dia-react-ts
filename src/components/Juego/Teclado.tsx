import BotonTecla from './BotonTecla';

interface Props {
  onTecla: (letra: string) => void;
  onBorrar: () => void;
  onEnter: () => void;
  estados: Record<string, 'correcta' | 'casi' | 'incorrecta' | 'pendiente' | undefined>;
  modoClaro: boolean;
}

const Teclado: React.FC<Props> = ({ onTecla, onBorrar, onEnter, estados, modoClaro }) => {
  const renderTecla = (valor: string, className = '') => (
    <BotonTecla
      modoClaro={modoClaro}
      key={valor}
      valor={valor}
      onClick={() => {
        if (valor === '⌫') onBorrar();
        else if (valor === '✔') onEnter();
        else onTecla(valor);
      }}
      estado={estados[valor]}
      className={className}
    />
  );

  return (
    <div className="w-full flex justify-center">
      <div style={{ width: '600px' }} className="scale-[min(1,calc(100vw/600))] origin-top space-y-2">
        
        {/* Fila 1 */}
        <div className="grid grid-cols-10 gap-1">
          {'QWERTYUIOP'.split('').map((letra) => renderTecla(letra))}
        </div>

        {/* Fila 2 */}
        <div className="grid grid-cols-10 gap-1">
          {'ASDFGHJKLÑ'.split('').map((letra) => renderTecla(letra))}
        </div>

        {/* Fila 3 centrada con ancho proporcional */}
        <div className="flex justify-center gap-1">
          {['✔', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'].map((letra) =>
            renderTecla(letra, 'w-[9.50%]')
          )}
        </div>
      </div>
    </div>
  );
};

export default Teclado;
