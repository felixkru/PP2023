'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import {apiPostRequest, handleApiCommunication, runWithTimeout} from './requestAPI';
import ScatterChart from './scatter-chart';
import {returnExcel, calculateExcel} from "../utils/excelfilereader";

export function HandleCalculateButtonClick(localRemoteButton) {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
        " oder eine XLSX- CSV-Datei!"

    let chartDeletion = 0;

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = async () => {
        /*
        Initialisierung von Variablen für den Programmverlauf.
         */
        const kPoints = validateKPoints(numberOfClusters);
        const inputDataSrc = checkInputSource();
        const localCalculation = localRemoteButton;
        const dataArrayForWorking = inputDataArray;
        chartDeletion = 1; //gibt an, dass das alte Chart von der ScatterChart funktion gelöscht werden muss

        if (inputDataSrc === "file") {
            /*
            Verarbeitung eines Files und Export an die KMeans-Api, anschließend wird das Ergebnis visualisiert.
             */
            if (!localCalculation) {
                try {
                    /*
                    Übersenden der eingegebenen Datei an das Backend.
                     */
                    const resultPost = await apiPostRequest(kPoints, false);
                    /*
                    Hier wird der Status der Task abgefragt. Aktuell wird ein Intervall von 3000 ms berücksichtigt.
                    Der Parameter maxVersuche, gibt dabei an, wie oft ein Request wiederholt werden soll, bis dieser abbricht.
                     */
                    if (resultPost.TaskID) {
                        const kMeansResult = await handleApiCommunication(resultPost);
                        //TODO Result richtig verarbeiten
                        console.log(kMeansResult);
                    }
                    /*
                    In dem catch-Block werden allgemeine Fehler des Requests behandelt.
                    */
                } catch (error) {
                    throw new error;
                }
                /*
                Auslesen eines Files und anschließende Verarbeitung im Client.
                */
            } else if (localCalculation) {
                /*
                Lokale Berechnung von KMeans mit der Visualisierung in Scatter-Chart.
                 */
                try {
                    const inputData = await calculateExcel();
                    // TODO Generierung Ladebildschirm
                    const timeout = 30000;
                    const result = await runWithTimeout(kMeansAlgorithm(inputData, kPoints), timeout);
                    ScatterChart(kPoints, chartDeletion, result);
                    console.log(result);
                    // TODO response verarbeiten
                } catch (err) {
                    throw new err;
                }
            }
            /*
            Verarbeitung von manuell eingegeben Daten lokal.
            */
        } else if (inputDataSrc === "manuel") {
            if (localCalculation) {
                const result = await kMeansAlgorithm(inputDataArray, kPoints);
                console.log(result)
                ScatterChart(kPoints, chartDeletion, result);
                /*
               Verarbeitung von manuell eingegeben Daten mithilfe der API.
                */
            } else if (!localCalculation) {
                try {
                    /*
                    Übersenden der eingegebenen Datei an das Backend.
                     */
                    const resultPost = await apiPostRequest(kPoints, dataArrayForWorking);
                    /*
                    Hier wird der Status der Task abgefragt. Aktuell wird ein Intervall von 3000 ms berücksichtigt.
                    Der Parameter maxVersuche, gibt dabei an, wie oft ein Request wiederholt werden soll, bis dieser abbricht.
                     */
                    if (resultPost.TaskID) {
                        const kMeansResult = await handleApiCommunication(resultPost);
                        console.log(kMeansResult)
                        // TODO response verarbeiten
                    }
                    /*
                    In dem catch-Block werden allgemeine Fehler des Requests behandelt.
                    */
                } catch (error) {
                    throw new error;
                }
            }
        }
    };

    /*
    Prüft, ob die Bearbeitung von manuellen Daten erfolgt oder eines Files.
     */
    const checkInputSource = () => {
        if (returnExcel() !== undefined) {
            return "file";
        } else if (inputDataArray.length !== 0) {
            return "manuel";
        } else {
            alert(noDataMessage);
            return false;
        }
    };

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

export function CalculateButton({localRemoteButton, setLocalRemoteButton}) {
    const handleCalculateButtonClick = HandleCalculateButtonClick(localRemoteButton, setLocalRemoteButton);

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