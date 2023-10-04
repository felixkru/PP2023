'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import ExcelFileUploader from '../components/ExcelFileUploader';

export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    /*
    Die Funktion handleClick steuert die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = () => {
        const kPoints = validateKPoints(numberOfClusters);
        const result = kMeansAlgorithm(dataSet, kPoints);

        console.log(result); // Testet Funktion von KMeans
        console.log(inputDataArray); // Testet Funktion der manuellen Eingabe
        console.log(numberOfClusters); // Testet Funktion der K-Eingabe
        return result;

    }

    /*
    validateKPoints validiert die K-Points, dass diese immer als Number übergeben werden.
     */
    const validateKPoints = (numberOfClusters) => {
        if (typeof numberOfClusters !== "number") {
            return parseInt(numberOfClusters);
        } else {
            return numberOfClusters;
        }
    };

    const dataSet = [
        [2, 3, 4],
        [2, 4, 3],
        [3, 3, 3],
        [4, 5, 6],
        [5, 4, 5],
        [6, 5, 7],
        [9, 7, 8],
        [10, 8, 9],
        [11, 8, 8],
    ];

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
