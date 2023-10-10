'use client'
import {APIError} from '../utils/userErrors';
import {returnExcel} from '../utils/excelfilereader';

export const apiPostRequest = (KPoints, dataArrayForWorking) => {

    /*
    Erstellung eines Form-Data Objektes. Innerhalb des Objektes können mittels eines Key, Value Verfahren
    einzelne Datei-Objekte erstellt werden.
     */
    const formData = new FormData();
    let corsValue = 'cors';

    if (dataArrayForWorking) {
        const dataPoints = {
            'data_points': dataArrayForWorking,
        };
        corsValue = 'no-cors';
        const jsonData = JSON.stringify(dataPoints);
        const file = new Blob([jsonData], {type: 'application/json'});
        formData.append('file', file, 'dataPoints.json');
    } else {
        const file = returnExcel();
        console.log(file)
        formData.append('file', file, `${file.name}`);
    }

    /*
    Die Url wird dynamisch generiert. Grund ist die Anforderung aus dem Backend, dass Parameter als Get übergeben werden,
    nur die Dateien werden mittels als Post übergeben.
     */
    const numberKRuns = '&number_kmeans_runs=20';
    const url = "https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/";
    const newKForGet = 'k=' + KPoints;
    const urlBearbeitet = url + '?' + newKForGet + numberKRuns;

    return fetch(urlBearbeitet, {
        mode: corsValue,
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        /*
        Behandlung des Responses der API, falls ein Error auftritt.
        */
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorData => {
                    APIError(errorData);
                    throw new Error(response.status + ' ' + response.statusText + ' ' + JSON.stringify(errorData));
                });
            }
        })
        /*
        Behandlung möglicher Fehler, globaler Kontext.
         */
        .catch(error => {
            throw error;
        });
};

export const apiGetStateOfTask = (taskId, maxVersuch) => {
    /*
    Generieren der Request-URl
     */
    const url = 'https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/status/'
    const completeUrl = url + taskId;

    const aktuellesIntervall = 3000;

    return fetch(completeUrl, {
        method: 'GET',
        headers: {
           "Accept" : "application/json"
        }
        })
        .then(result => {
            if (result.status === 200) {
               return result.json();
            } else {
                return result.json().then(errorText => {
                    APIError(errorText);
                    throw new Error('Fehler beim Response: ' + result.status + ' ' + errorText);
                });
            }
        })
        .then(response => {
            if (response.status === 'completed') {
                console.log(response.status)
                return 200;
            } else if (maxVersuch > 0 && response.status === 'processing') {
                console.log("Timeout" + maxVersuch)
                setTimeout(()=> {
                    apiGetStateOfTask(taskId, maxVersuch - 1);
                }, aktuellesIntervall);
            } else {
                return response.json().then(errorText => {
                    APIError(errorText);
                    throw new Error('Fehler beim Response: ' + response.status + ' ' + errorText);
                });
            }
        })
        /*
        Behandlung möglicher Fehler, globaler Kontext.
         */
        .catch(err => {
            throw err;
        });
}

export const apiGetResult = (taskId) => {
    /*
    Nur für lokales Testen
     */
    if (!taskId) {
        taskId = 'b28c3385-2bb5-4f8c-b61f-7bb8ae8e23d6';
    }
    /*
    Zusammengesetzte URL für den GET-Request.
     */
    const url = 'https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/result/'
    const completeUrl = url + taskId;

    return fetch(completeUrl, {
        method: 'GET',
        headers: {
            "Accept" : "application/json"
        }
    })
        /*
        Gibt das Ergebnis des Response-Promise zurück.
         */
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorText => {
                    APIError(errorText);
                    throw new Error('Fehler beim Response: ' + response.status + ' ' + errorText);
                });
            }
        })
        /*
        Behandlung möglicher Fehler, globaler Kontext.
         */
        .catch(err => {
            throw err;
        });
}

export const exportFunctionDataForKMeans = (kPoints, taskId, dataArrayForWorking) => {
    return (
        apiPostRequest(kPoints, dataArrayForWorking),
        apiGetStateOfTask(taskId),
        apiGetResult(taskId)
    );
};