'use client'
import { UseInputKPoints } from './input-k-points';

export function HandleCalculateButtonClick() {
    const { numberOfClusters } = UseInputKPoints();

    const handleClick = () => {
        console.log(numberOfClusters);
    }

    return handleClick;
}

export function CalculateButton() {
    const handleCalculateButtonClick = HandleCalculateButtonClick();

    return (
        <button
            type="button"
            className='compute-btn button'
            onClick={handleCalculateButtonClick}
        >
            Berechnen
        </button>
    );
}
