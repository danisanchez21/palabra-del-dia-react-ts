type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  modoClaro: boolean;
  valor: string;
  onClick: () => void;
  estado?: EstadoLetra;
}

const BotonTecla: React.FC<Props> = ({ valor, onClick, estado }) => {
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
          border-none text-white text-base font-bold uppercase
          px-3 py-2 rounded m-[0.2rem] min-w-[2.5rem] cursor-pointer
          transition-colors duration-200
        `}
        onClick={onClick}
      >
        {valor}
      </button>
    );
  };
  
  export default BotonTecla;
  
