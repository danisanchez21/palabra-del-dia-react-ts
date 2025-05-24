type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  modoClaro: boolean;
  valor: string;
  onClick: () => void;
  estado?: EstadoLetra;
  className?: string;
}

const BotonTecla: React.FC<Props> = ({ valor, onClick, estado, className }) => {
  const estadoStyles = {
    correcta: "bg-green-600",
    casi: "bg-yellow-600",
    incorrecta: "bg-gray-800",
    pendiente: "bg-[#666]",
  };

  return (
    <button
      className={`
        ${estado ? estadoStyles[estado] : 'bg-[#666]'}
        aspect-square
        text-white font-bold uppercase
        text-[clamp(0.75rem,2.5vw,1.25rem)]
        rounded
        transition-colors duration-200
        flex items-center justify-center
        select-none
        ${className ?? ''}
      `}
      onClick={onClick}
    >
      {valor}
    </button>
  );
};

export default BotonTecla;
