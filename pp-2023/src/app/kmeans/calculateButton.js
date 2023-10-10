'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import {apiPostRequest, apiGetStateOfTask, apiGetResult} from './requestAPI';
import ScatterChart from './scatter-chart';
import {returnExcel, calculateExcel} from "../utils/excelfilereader";
import {APIError} from '../utils/userErrors';

export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
        " oder eine XLSX- CSV-Datei!"

    let chartDeletion = 0;

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = async () => {
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
                        try {
                            const resultGetStateOfTask = await apiGetStateOfTask(resultPost.TaskID, 10);

                            /*
                            Liefert die apiGetStateOfTask eine 1 zurück, ist der Response erfolgreich und kann verarbeitet werden.
                             */
                            if (resultGetStateOfTask === 1) {
                                const apiResult = await apiGetResult(resultPost.TaskID);
                                // TODO handling des Resposne @Felix Kruse
                                console.log(apiResult)
                            }
                        }
                        /*
                        Ist die Berechnung zu umfassend, dass das Zeitlimit reißt, wird dem Nutzer in dem catch-Block ein Error angezeigt.
                         */
                        catch (err) {
                            const error = {
                                "detail" : "Das Zeitlimit der Berechnung ist überschritten. " +
                                    "Bitte verringern Sie die Anzahl an Datensätzen oder die Anzahl K."
                            }
                            APIError(error);
                        }
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
                const inputData = await calculateExcel();
                //TODO Ladebildschirm
                const result = await kMeansAlgorithm(inputData, kPoints);
                ScatterChart(kPoints, chartDeletion, result);
            } else {
                alert('Bitte Klicken Sie auf den Button Lokal/ Serverseitig.');
            }
            /*
            Verarbeitung von manuell eingegeben Daten lokal.
             */
        } else if (inputDataSrc === "manuel") {
            if (localCalculation) {
                const result = kMeansAlgorithm(inputDataArray, kPoints);
                ScatterChart(kPoints, chartDeletion, result);
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