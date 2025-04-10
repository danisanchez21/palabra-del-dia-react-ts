import React from 'react';

interface Props {
  onJugar: () => void;
}

const PantallaInicio: React.FC<Props> = ({ onJugar }) => {
  return (
    <div className="text-white bg-[#121213] min-h-screen text-center p-8">
      <h1 className="text-4xl mb-8 flex flex-wrap justify-center gap-1">
        <span className="bg-[#3a3a3c] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">L</span>
        <span className="bg-[#3a3a3c] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">A</span>
        &nbsp;
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">P</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">A</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">L</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">A</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">B</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">R</span>
        <span className="bg-[#538d4e] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">A</span>
        &nbsp;
        <span className="bg-[#3a3a3c] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">D</span>
        <span className="bg-[#3a3a3c] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">E</span>
        <span className="bg-[#3a3a3c] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">L</span>
        &nbsp;
        <span className="bg-[#b59f3b] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">D</span>
        <span className="bg-[#b59f3b] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">Í</span>
        <span className="bg-[#b59f3b] w-10 h-10 flex items-center justify-center font-bold text-lg rounded">A</span>
      </h1>
      <div className="text-left max-w-xl mx-auto mb-8 space-y-4 leading-7.5">
        <p>¿Listo para el reto? Tienes 6 intentos para descubrir la palabra secreta.</p>
        <p>
          Cada palabra que pruebes debe ser válida. Si no lo es, se te avisará para que lo intentes de nuevo.
        </p>
        <p>
          Al enviar una palabra, verás cómo cambian los colores de las letras. Esto te dará pistas sobre qué tan cerca estás de acertar:
        </p>

        <ul className="space-y-1">
          <li><span className="text-[#538d4e] font-bold">VERDE</span>: La letra está en el lugar <strong>exacto</strong>.</li>
          <li><span className="text-[#b59f3b] font-bold">AMARILLO</span>: La letra está en la palabra, pero en una <strong>posición distinta</strong>.</li>
          <li><span className="text-[#787c7e] font-bold">GRIS</span>: Esa letra <strong>no aparece</strong> en la palabra.</li>
        </ul>

        <p>¿Te atreves? Cada día hay una nueva palabra para resolver.</p>
      </div>

      <button
        onClick={onJugar}
        className="bg-[#538d4e] hover:bg-[#b59f3b] text-white border-none px-8 py-4 text-lg rounded-xl cursor-pointer transition-colors duration-300"
      >
        ¡Jugar!
      </button>
    </div>
  );
};

export default PantallaInicio;
