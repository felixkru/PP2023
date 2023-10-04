'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import {apiPostRequest, apiGetStateOfTask, apiGetResult} from './requestAPI';


export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
        " oder eine XSLX- CSV-Datei!"

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
    const handleClick = () => {
        const kPoints = validateKPoints(numberOfClusters);
        //const inputDataSrc = checkInputSource(); TODO
        //const  localCalculation = checkLocalOrServer(); TODO
        const localCalculation = false; // nur zum Testen
        const inputDataSrc = 'manuel'; // nur zum Testen
        const dataArrayForWorking = inputDataArray;

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
                            // TODO Result kann später weiter verarbeitet werden.
                        });
                    }
                });
            } else if (localCalculation) {
                // TODO Auslesen der Excel/ CSV Datei
                // const result = kMeansAlgorithm(ExcelData, kPoints);
            } else {
                alert('Bitte Klicken Sie auf den Button Lokal/ Serverseitig.');
            }
        } else if (inputDataSrc === "manuel") {
            if (localCalculation) {
                const result = kMeansAlgorithm(inputDataArray, kPoints);
                console.log(result);
            } else if (!localCalculation){
                const result = apiPostRequest(kPoints, dataArrayForWorking);
                console.log(result);
            }
            else {
                alert('Bitte Klicken Sie auf den Button Lokal/ Serverseitig.');
            }
        }
    };

    const checkInputSource = () => {
        if (1===3) {
            // TODO --> Checken, ob eine Datei vorhanden ist (nicht auslesen!)
        } else if (inputDataArray.length !== 0) {
            return "manuel";
        }
        else {
            alert(noDataMessage);
            return false;
        }
    };

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
