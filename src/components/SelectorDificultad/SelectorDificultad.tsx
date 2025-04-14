import React from "react";

type SelectorDificultadProps = {
    onSeleccionarDificultad: (dificultad: "facil" | "normal" | "dificil") => void;
};

const SelectorDificultad: React.FC<SelectorDificultadProps> = ({
    onSeleccionarDificultad,
}) => {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>Selecciona una dificultad</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "1rem",
                }}
            >
                <button onClick={() => onSeleccionarDificultad("facil")}>
                    Fácil (5 letras)
                </button>
                <button onClick={() => onSeleccionarDificultad("normal")}>
                    Normal (7 letras)
                </button>
                <button onClick={() => onSeleccionarDificultad("dificil")}>
                    Difícil (9 letras)
                </button>
            </div>
        </div>
    );
};

export default SelectorDificultad;
