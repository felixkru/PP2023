'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';

export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder ein manuell Ihre Datenpunkte ein" +
        " oder eine XSLX- CSV-Datei!"

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
    Ablauf:
    - Prüft auf die src file oder manuel
    - Prüft auf lokale-Verarbeitung oder Remote
     */
    const handleClick = () => {
        const kPoints = validateKPoints(numberOfClusters);
        const inputDataSrc = checkInputSource();
        const localCalculation = checkLocalOrServer();

        if (inputDataSrc === "file") {
            if (!localCalculation) {
                // TODO Request an die Api mit File URL
            } else {
                // TODO Auslesen der Excel Datei
                // const result = kMeansAlgorithm(ExcelData, kPoints);
            }
        } else {
            // TODO validieren der eingegeben Daten
            if (localCalculation) {
                const result = kMeansAlgorithm(inputDataArray, kPoints);
                console.log(result);
            } else {
                // TODO Request an die API implementieren
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
