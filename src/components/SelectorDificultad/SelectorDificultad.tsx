import React from "react";

type SelectorDificultadProps = {
    onSeleccionarDificultad: (dificultad: "facil" | "normal" | "dificil") => void;
};

const SelectorDificultad: React.FC<SelectorDificultadProps> = ({
    onSeleccionarDificultad,
}) => {
    return (
        <div>
            <h2>Selecciona una dificultad</h2>
            <div>
                <button onClick={() => onSeleccionarDificultad("facil")}>
                    Fácil
                </button>
                <button onClick={() => onSeleccionarDificultad("normal")}>
                    Normal
                </button>
                <button onClick={() => onSeleccionarDificultad("dificil")}>
                    Difícil
                </button>
            </div>
            <div>
                <p>Cada dificultad presenta una serie de diferencias entre ellas:</p>

                <ul>
                    <li><strong>FÁCIL</strong>: Tendrás <strong>6 intentos</strong> para adivinar una palabra de <strong>5 letras</strong>.</li>
                    <li><strong>NORMAL</strong>: Tendrás <strong>5 intentos</strong> para adivinar una palabra de <strong>7 letras</strong>.</li>
                    <li><strong>DIFÍCIL</strong>: Tendrás <strong>7 intentos</strong> para adivinar una palabra de <strong>9 letras</strong>.</li>
                </ul>

                <p>¿Que me dices? ¿Te atreves con las dificultades más altas? 😎💯</p>
            </div>
        </div>
    );
};

export default SelectorDificultad;
