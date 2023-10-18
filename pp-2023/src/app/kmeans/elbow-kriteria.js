import {kMeansAlgorithm} from "../utils/kmeans";
import {APIError} from "../utils/userErrors";
import {useState} from "react";
import {calculateExcel, returnExcel} from "../utils/excelfilereader";
import {HandleDynamicGeneratedInputFields} from "./create-save-manuel-input";
import {
    apiPostRequest,
    handleApiCommunication,
    runWithTimeout,
    validateLengthOfData,
} from "./requestAPI";
import ScatterChart from "./scatter-chart";
import {useLoadingStatus} from "../common/LoadingScreen";
/*
Die Funktion nimmt zwei Vektoren als Parameter entgegen und gibt die euklidische Distanz zwischen diesen beiden zurück.
*/
export const euclideanDistance = (point1, point2) => {
    if (point1.length !== point2.length) {
        throw new Error("Die Vektoren müssen die gleiche Länge haben");
    }

    let sumOfSquares = 0;
    for (let i = 0; i < point1.length; i++) {
        const difference = point1[i] - point2[i];
        sumOfSquares += difference * difference;

  }
    return Math.sqrt(sumOfSquares);
};

/*
Die Funktion führt die Berechnung für das Elbow-Kriteria 3x durch, da Kmeans immer random K aufruft.
Dies soll die Ungenauigkeiten abmildern.
 */
export const calculateMiddleOfK = async (validInput, inputDataArray, timeout) => {
    const promise1 = runWithTimeout(Promise.resolve(CalculateElbowKriteria(validInput, inputDataArray)), timeout);
    const promise2 = runWithTimeout(Promise.resolve(CalculateElbowKriteria(validInput, inputDataArray)), timeout);
    const promise3 = runWithTimeout(Promise.resolve(CalculateElbowKriteria(validInput, inputDataArray)), timeout);

    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);
    console.log(result1, result2, result3);
}

/*
Die Funktion nimmt als Parameter ein Datenset als zweidimensionales Array, sowie die Anzahl an K-Punkten auf
und gibt die verscheiden Cluster zurück.
*/
const KMeansResult = (data, kPoints) => {
    const result = kMeansAlgorithm(data, kPoints);
    if (result) {
        return result.groups;
    } else {
        return false;
    }
};

/*
Die Funktion nimmt als Parameter ein Array groups entgegen. Anschließend wir die Distanzsumme der quadrierten Einzeldistanzen
zurückgegeben.
 */
export const SummeDerDistanzen = (groups) => {
    let totalDistance = 0;
    groups.forEach((group) => {
        let groupDistance = 0;
        group.cluster.forEach((cluster) => {
            const distance = euclideanDistance(cluster, group.centroid);
            groupDistance = distance + groupDistance;
        });
        totalDistance = totalDistance + groupDistance;
    });
    return totalDistance;
};

/*
Die Funktion ruft für jedes K bis zum Maxwert einmal die Funktion Kmeans auf, anschließend wird die Distanz berechnet.
Ein Array enthält die gesamten Distanzen für das Elbow-Kriterium.
 */
export const CreateArrayOfDistances = async (kPunkteMax, dataset) => {
    const arrayOfDistance = [];
    for (let i = 1; i <= kPunkteMax; i++) {
        if (i < dataset.length) {
            const result = KMeansResult(dataset, i);
            const distance = SummeDerDistanzen(result);
            arrayOfDistance.push(distance);
        } else {
            APIError(
                "Es sind mehr K als Datenpunkte abgefragt worden. Es werden nur Distanzen berechnet für die Anzahl an " +
                "Datenpunkten!"
            );
            break;
        }
    }
    return arrayOfDistance;
};
/*
Die asynchrone Funktion nimmt die vom Nutzer eingegeben K Punkte, sowie ein manuell eingegebenes Datenset und berechnet die Distanzen.
 */
export const CalculateElbowKriteria = async (kPunkte, dataSet) => {
    let dataForWorking;
    /*
      Hier wird geprüft, ob eine Datei verwendet werden soll, oder das Datenset des Users.
       */
    const file = await returnExcel();
    if (file !== undefined) {
        dataForWorking = await calculateExcel();
    } else if (dataSet.length > 0) {
        dataForWorking = dataSet;
    } else {
        APIError(
            "Bitte geben Sie Ihre Datenpunkte ein, oder stellen eine Datei zur Verfügung."
        );
        return;
    }

    return await CreateArrayOfDistances(kPunkte, dataForWorking);
};

/*
Erstellt ein Array aus Objekten.
 */
export const CreateResultObject = (result) => {
    return result.map((value, index) => ({[index + 1]: value}));
};
/*
Erstellt ein Array mit Objekten aus einem einzigen Objekt.
 */
export const CreateAPICallResultObject = (result) => {
    return Object.entries(result).map(([key, value]) => ({[key]: value}));
};

/*
Ruft eine asynchrone Funktion auf, welche das Elbow-Criteria durchführt.
 */
export const CreateElbowCriteriaElements = ({
                                                inputKForElbow,
                                                setInputKForElbow,
                                                localRemoteButton,
                                                bestKForKMeans,
                                                setBestKForKMeans,
                                            }) => {
    const {startLoading, stopLoading} = useLoadingStatus();
    const [userInput, setUserInput] = useState("");
    const {inputDataArray} = HandleDynamicGeneratedInputFields();

    const handleInputButtonClick = async () => {
        const kMeansOrElbow = "Elbow";
        const calledByButton = 1;

        startLoading();
        /*
            Die User-Eingaben zum MaxK werden geprüft, ob diese valide sind.
             */
        const validInput = validateInputButtonClick(userInput);
        if (validInput !== undefined) {
            const timeout = 30000;

            /*
                  Prüft, ob die Verarbeitung lokal oder Remote stattfinden soll.
                   */
            if (!localRemoteButton) {
                try {
                    const result = await runWithTimeout(
                        Promise.resolve(CalculateElbowKriteria(validInput, inputDataArray)),
                        timeout
                    );
                    console.log(123)
                    const resultObject = CreateResultObject(result);
                    ScatterChart(
                        setInputKForElbow,
                        calledByButton,
                        resultObject,
                        "local",
                        kMeansOrElbow
                    );
                } catch (error) {
                    APIError("Berechnung wurde abgebrochen (Timeout).");
                } finally {
                    stopLoading();
                }
            } else {
                if (returnExcel() !== undefined) {
                    try {
                        /*
                                    Die vom User eingegebene Datei wird an die Backend-Api übersendet und eine Task wird zurückgegeben.
                                     */
                        const url =
                            "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/elbow/";
                        const kForUrl = "k_min=1&k_max=" + validInput;
                        const task = await apiPostRequest(url, kForUrl, validInput, false);

                        /*
                                    Ist eine TaskID vorhanden, wird der Status dieser abgefragt und anschließend das Ergebnis verarbeitet.
                                     */
                        if (task.TaskID) {
                            const elbowResult = await handleApiCommunication(task, 10);
                            const result = CreateAPICallResultObject(elbowResult);
                            ScatterChart(
                                setInputKForElbow,
                                calledByButton,
                                result,
                                "local",
                                kMeansOrElbow
                            );
                        }
                    } catch (err) {
                        APIError("Ihre Datei konnte nicht verarbeitet werden!");
                    } finally {
                        stopLoading();
                    }
                } else if (inputDataArray.length !== 0) {
                    try {
                        /*
                                    Die vom User eingegebenen Daten an die Backend-Api übersendet und eine Task wird zurückgegeben.
                                     */
                        const url =
                            "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/elbow/";
                        const kForUrl = "k_min=1&k_max=" + validInput;
                        const task = await apiPostRequest(
                            url,
                            kForUrl,
                            validInput,
                            inputDataArray
                        );

                        /*
                                      Ist eine TaskID vorhanden, wird der Status dieser abgefragt und anschließend das Ergebnis verarbeitet.
                                     */
                        if (task.TaskID) {
                            const elbowResult = await handleApiCommunication(task, 10);
                            const result = CreateAPICallResultObject(elbowResult);
                            ScatterChart(
                                setInputKForElbow,
                                calledByButton,
                                result,
                                "local",
                                kMeansOrElbow
                            );
                        }
                    } catch (err) {
                        APIError(err);
                    } finally {
                        stopLoading();
                    }
                } else {
                    APIError(
                        "Bitte geben Sie ein manuelles Cluster ein, oder eine Datei."
                    );
                }
            }
        }
        stopLoading();
    };

    /*
      Die Funktion validiert die User-Eingabe. Dabei wird geprüft, ob der Input eine
      Ganzzahl ist unf kleiner als 26.
       */
    const validateInputButtonClick = (value) => {
        const valueAsInt = parseInt(value);
        if (Number.isInteger(valueAsInt)) {
            if (value <= 25) {
                setInputKForElbow(valueAsInt);
                return valueAsInt;
            } else {
                setInputKForElbow("");
                setUserInput("");
                APIError("Bitte geben Sie eine Zahl kleiner gleich 25 ein!");
            }
        } else {
            setInputKForElbow("");
            APIError("Bitte geben Sie eine Ganzzahl ein.");
        }
    };

    return (
        <div className="mt-5 mb-5 flex row-cols-1">
            <div>
                <div className="grid-cell-elbow">
                    <button
                        className="btn btn-primary btn-lg btn-elbow"
                        type="submit"
                        onClick={handleInputButtonClick}
                    >
                        Elbow-Kriteria
                    </button>
                </div>
                <div className="grid-cell-elbow">
                    <div className="input-group input-group-lg">
                        <label
                            className="input-group-text"
                            id="label-input-k-elbow"
                            htmlFor="input-k-elbow"
                        >
                            Max K
                        </label>
                        <input
                            placeholder="max 25"
                            max="25"
                            step="1"
                            id="input-k-elbow"
                            type="number"
                            className="form-control input-k-elbow"
                            aria-label="label-input-k-elbow"
                            aria-describedby="inputGroup-sizing-lg"
                            value={userInput}
                            onChange={(event) => setUserInput(event.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
