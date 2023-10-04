'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import ScatterChart from './scatter-chart';

export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();
    let chartDeletion = 0;
    
    /*
    Die Funktion handleClick steuert die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = () => {
        const kPoints = validateKPoints(numberOfClusters);
        const result = kMeansAlgorithm(dataSet, kPoints);
        chartDeletion = 1;
        ScatterChart(numberOfClusters,chartDeletion);
        console.log(result); // Testet Funktion von KMeans
        console.log(inputDataArray); // Testet Funktion der manuellen Eingabe
        console.log(numberOfClusters); // Testet Funktion der K-Eingabe
        return result;
        
    }

    //ScatterChart(numberOfClusters,chartDeletion);

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
        [2, 3],
        [2, 4],
        [3, 3],
        [4, 5],
        [5, 4],
        [6, 5],
        [9, 7],
        [10, 8],
        [11, 8],
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
