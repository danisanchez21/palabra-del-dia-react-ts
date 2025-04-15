import LetraCelda from './LetraCelda';

type EstadoLetra = 'correcta' | 'casi' | 'incorrecta' | 'pendiente';

interface LetraIntento {
  letra: string;
  estado: EstadoLetra;
}

interface Props {
  letras: LetraIntento[];
  modoClaro: boolean;
}

const Fila: React.FC<Props> = ({ letras, modoClaro }) => {

  return (
    <div className="flex justify-center">
      {letras.map((l, i) => (
        <LetraCelda modoClaro={modoClaro} key={i} letra={l.letra} estado={l.estado} />
      ))}
    </div>
  );
};

export default Fila;
