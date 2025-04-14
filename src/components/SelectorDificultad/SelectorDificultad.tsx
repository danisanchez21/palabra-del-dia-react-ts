import React from "react";

type SelectorDificultadProps = {
    onSeleccionarDificultad: (dificultad: "facil" | "normal" | "dificil") => void;
};

const SelectorDificultad: React.FC<SelectorDificultadProps> = ({
    onSeleccionarDificultad,
}) => {
    return (
        <div className="text-center p-8 text-white">
            <h2 className="text-2xl font-bold">Selecciona una dificultad</h2>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => onSeleccionarDificultad("facil")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    Fácil
                </button>
                <button
                    onClick={() => onSeleccionarDificultad("normal")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    Normal
                </button>
                <button
                    onClick={() => onSeleccionarDificultad("dificil")}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                >
                    Difícil
                </button>
            </div>
            <div className="text-left max-w-xl mx-auto mb-8 mt-12 space-y-4 leading-5.5">
                <p>Cada dificultad presenta una serie de diferencias entre ellas:</p>


                <ul className="space-y-1 leading-7">
                    <li><span className="text-green-600 font-bold">FÁCIL</span>: Tendrás <strong>6 intentos</strong> para adivinar una palabra de <strong>5 letras</strong>.</li>
                    <li><span className="text-yellow-500 font-bold">NORMAL</span>: Tendrás <strong>5 intentos</strong> para adivinar una palabra de <strong>7 letras</strong>.</li>
                    <li><span className="text-red-600 font-bold">DIFÍCIL</span>: Tendrás <strong>7 intentos</strong> para adivinar una palabra de <strong>9 letras</strong>.</li>
                </ul>

                <p>¿Que me dices? ¿Te atreves con las dificultades más altas? 😎💯</p>
            </div>

        </div>
    );
};

export default SelectorDificultad;
