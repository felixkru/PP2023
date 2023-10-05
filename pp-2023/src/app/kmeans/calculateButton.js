'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import ScatterChart from './scatter-chart';
import * as XLSX from "xlsx";

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
        chartDeletion = 1; //gibt an, dass das alte Chart von der ScatterChart funktion gelöscht werden muss
        ScatterChart(numberOfClusters,chartDeletion,result); //erzeugt das 2d Chart mithilfe der berechneten Daten des kMeans Algorithmus
        console.log(result); // Testet Funktion von KMeans
        console.log(inputDataArray); // Testet Funktion der manuellen Eingabe
        console.log(numberOfClusters); // Testet Funktion der K-Eingabe
        readExcelFile();
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

function readExcelFile() {
    // ließt Datei aus dem Dateiinputfeld
    const fileInput = document.getElementById('excelFileInput');
    const file = fileInput.files[0];
    // führt nur aus wenn eine Datei vorhanden ist sonnst Fehlermeldung
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // hier wird das zweidimensionale Array gebaut
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Annahme: Erste Arbeitsblatt verwenden

            if (sheetName) {
                const worksheet = workbook.Sheets[sheetName];
                const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // 'dataArray' enthält zweidimensionales Array
                console.log(dataArray);
            } else {
                console.error('Arbeitsblatt nicht gefunden');
            }
        };

        reader.readAsBinaryString(file);
    } else {
        console.error('Bitte wählen Sie eine Excel-Datei aus.');
    }
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