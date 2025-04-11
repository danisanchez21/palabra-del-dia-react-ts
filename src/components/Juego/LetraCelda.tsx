type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface Props {
  letra: string;
  estado?: EstadoLetra;
  animada?: boolean;
}

const LetraCelda: React.FC<Props> = ({ letra, estado = 'pendiente', animada = false }) => {
  const estadoStyles = {
    pendiente: "bg-transparent text-white",
    correcta: "bg-[#00A63E] text-white",
    casi: "bg-[#DAA520] text-white",
    incorrecta: "bg-[#364153] text-white",
  };

  return (
    <div
      className={`
        w-12 h-12 border-2 border-[#555]
        flex items-center justify-center
        font-bold text-xl uppercase
        m-[0.1rem]
        transition-colors duration-300
        ${estadoStyles[estado]}
        ${animada ? 'animate-bounce' : ''}
      `}
    >
      {letra}
    </div>
  );
};

export default LetraCelda;
