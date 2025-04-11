import LetraCelda from './LetraCelda';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

interface Props {
  letras: LetraIntento[];
}

const Fila: React.FC<Props> = ({ letras }) => {
  return (
    <div className="flex justify-center">
      {letras.map((l, i) => (
        <LetraCelda key={i} letra={l.letra} estado={l.estado} />
      ))}
    </div>
  );
};

export default Fila;
