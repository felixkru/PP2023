'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import {apiPostRequest, apiGetStateOfTask, apiGetResult} from './requestAPI';
import ScatterChart from './scatter-chart';
import {returnExcel, calculateExcel} from "../utils/excelfilereader";

export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
        " oder eine XLSX- CSV-Datei!"

    let chartDeletion = 0;

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = () => {

        const kPoints = validateKPoints(numberOfClusters);
        const inputDataSrc = checkInputSource();

        //const  localCalculation = checkLocalOrServer(); TODO
        const localCalculation = true; // nur zum Testen

        const dataArrayForWorking = inputDataArray;
        chartDeletion = 1; //gibt an, dass das alte Chart von der ScatterChart funktion gelöscht werden muss

        if (inputDataSrc === "file") {
            /*
            Verarbeitung eines Files und Export an die KMeans-Api, anschließend wird das Ergebnis visualisiert.
             */
            if (!localCalculation) {
                const resultPost = apiPostRequest(kPoints, false);
                console.log(resultPost); // TODO handling muss noch gemacht werden

                const resultGetStateOfTask = apiGetStateOfTask();
                resultGetStateOfTask.then(result => {

                    if (result === 200) {
                        const resultKMeans = apiGetResult();
                        resultKMeans.then(resultKMeans => {
                            console.log(resultKMeans.result);
                            //erzeugt das 2d Chart mithilfe der berechneten Daten des kMeans Algorithmus
                            ScatterChart(numberOfClusters, chartDeletion, result);
                        });
                    }
                });
                /*
                Auslesen eines Files und anschließende Verarbeitung im Client.
                 */
            } else if (localCalculation) {
                const inputData = calculateExcel();
                console.log(inputData)
                // TODO Auslesen der Excel/ CSV Datei
                // const result = kMeansAlgorithm(ExcelData, kPoints);
            } else {
                alert('Bitte Klicken Sie auf den Button Lokal/ Serverseitig.');
            }
            /*
            Verarbeitung von manuell eingegeben Daten lokal.
             */
        } else if (inputDataSrc === "manuel") {
            if (localCalculation) {
                const result = kMeansAlgorithm(inputDataArray, kPoints);
                ScatterChart(numberOfClusters, chartDeletion, result);
                console.log(result);
                /*
               Verarbeitung von manuell eingegeben Daten mithilfe der API.
                */
            } else if (!localCalculation) {
                const result = apiPostRequest(kPoints, dataArrayForWorking);
                console.log(result);
            } else {
                alert('Bitte Klicken Sie auf den Button Lokal/ Serverseitig.');
            }
        }
    };


    /*
    Prüft, ob die Bearbeitung von manuellen Daten erfolgt oder eines Files.
     */
    const checkInputSource = () => {
        if (returnExcel() !== undefined) {
            // TODO --> Checken, ob eine Datei vorhanden ist (nicht auslesen!)
            return "file";
        } else if (inputDataArray.length !== 0) {
            return "manuel";
        } else {
            alert(noDataMessage);
            return false;
        }
    };

    /*
    Prüft die Verarbeitung, ob diese lokal oder serverseitig erfolgen soll.
     */
    const checkLocalOrServer = () => {
        //TODO --> Auswertung, ob die Berechnung lokal oder auf dem Server erfolgt
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