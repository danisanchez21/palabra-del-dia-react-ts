type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  letra: string;
  estado?: EstadoLetra;
  modoClaro: boolean;
  animada?: boolean;
}

const LetraCelda: React.FC<Props> = ({ letra, estado = 'pendiente', animada = false, modoClaro }) => {
  const colorTexto = estado !== 'pendiente'
  ? 'text-white'
  : modoClaro ? 'text-black' : 'text-white';


  const estadoStyles = {
    pendiente: "bg-transparent ",
    correcta: "bg-[#00A63E] ",
    casi: "bg-[#DAA520] ",
    incorrecta: "bg-[#364153] ",
  };

  return (
    <div
      className={`
        w-[8vw] h-[8vw] sm:w-12 sm:h-12 border-2 border-[#555]
        flex items-center justify-center
        font-bold text-[5vw] sm:text-xl uppercase
        m-[0.1rem]
        transition-colors duration-300
        ${estadoStyles[estado]} ${colorTexto}
        ${animada ? 'animate-bounce' : ''}
      `}
    >
      {letra}
    </div>
  );
};

export default LetraCelda;
