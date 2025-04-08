import { PalabraDelDia } from '../types/palabra';


export const fetchPalabraDelDia = (): Promise<PalabraDelDia> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                palabra: 'coche',
                definicion: 'Vehículo automóvil de cuatro ruedas utilizado para el transporte.'
            });
        }, 1000);
    });
};
