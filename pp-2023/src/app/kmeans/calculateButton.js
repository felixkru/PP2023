'use client'
import {UseInputKPoints} from './input-k-points';
import {kMeansAlgorithm} from '../utils/kmeans';
import {HandleDynamicGeneratedInputFields} from './create-save-manuel-input';
import {exportFunctionDataForKMeans} from './requestAPI';
import CSV_FILE from '../utils/test.csv';


export function HandleCalculateButtonClick() {

    const {numberOfClusters} = UseInputKPoints();
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const noDataMessage = "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
        " oder eine XSLX- CSV-Datei!"

    /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
    Ablauf:
    - Prüft auf die src file oder manuel
    - Prüft auf lokale-Verarbeitung oder Remote
     */
    const handleClick = () => {
        const urlKMeans = "https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/";
        const kPoints = validateKPoints(numberOfClusters);
        //const inputDataSrc = checkInputSource();
        //const  localCalculation = checkLocalOrServer();
        // constFileUrl = TODO;
        const localCalculation = false;
        const inputDataSrc = 'manuel';

        if (inputDataSrc === "file") {
            if (!localCalculation) {
                const formData = new FormData();
                //formData.append()
                // TODO Request an die Api mit File URL
            } else {
                // TODO Auslesen der Excel Datei
                // const result = kMeansAlgorithm(ExcelData, kPoints);
            }
        } else if (inputDataSrc === "manuel") {
            // TODO validieren der eingegeben Daten
            if (localCalculation) {
                const result = kMeansAlgorithm(inputDataArray, kPoints);
                console.log(result);
            } else {
                const formData = new FormData();
                const file = new Blob([CSV_FILE], {type: 'text/csv'});
                formData.append('file', file, 'test.csv');
                console.log(formData.get('file').name);
                const result = exportFunctionDataForKMeans(urlKMeans, formData, kPoints);
                console.log(result);
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
