'use client'
import {returnExcel} from '../utils/excelfilereader';

export const validateLengthOfData = (data, kPoints) => {
    if (data.length < kPoints) {
        alert("Sie haben mehr K Punkte angegeben als Datensätze, das ist nicht möglich.")
        return false;
    }
    return true;
}

export const apiPostRequest = (KPoints, dataArrayForWorking) => {

    /*
    Erstellung eines Form-Data Objektes. Innerhalb des Objektes können mittels eines Key, Value Verfahren
    einzelne Datei-Objekte erstellt werden.
     */
    const formData = new FormData();
    let corsValue = 'cors';
    if (dataArrayForWorking) {
        if (validateLengthOfData(dataArrayForWorking, KPoints) === false) {
            return;
        }
        const dataPoints = {
            'data_points': dataArrayForWorking,
        };
        corsValue = 'no-cors';
        const jsonData = JSON.stringify(dataPoints);
        const file = new Blob([jsonData], {type: 'application/json'});
        formData.append('file', file, 'dataPoints.json');
    } else {
        const file = returnExcel();
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
        Behandlung von dem Response der API, falls ein Error auftritt.
        */
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorData => {
                    throw new Error(response.status + ' ' + response.statusText + ' ' + JSON.stringify(errorData));
                });
            }
        })
        /*
        Behandlung möglicher Fehler.
         */
        .catch(error => {
            console.error('Fehler bei der Anfrage:', error);
            throw error;
        });
};

export const apiGetStateOfTask = (taskId) => {
    /*
    Nur für lokales Testen
     */
    if (!taskId){
        taskId = 'b28c3385-2bb5-4f8c-b61f-7bb8ae8e23d6';
    }
    /*
    Generieren der Request-URl
     */
    const url = 'https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/status/'
    const completeUrl = url + taskId;

    return fetch(completeUrl, {
        method: 'GET',
        headers: {
           "Accept" : "application/json"
        }
        })
        .then(response => {
            if (response.ok) {
                return response.status;
            } else {
                return response.text().then(errorText => {
                    throw new Error('Fehler beim Response: ' + response.status + ' ' + errorText);
                });
            }
        })
        .catch(err => {
            console.error('Fehler beim Response:', err);
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
                return response.text().then(errorText => {
                    throw new Error('Fehler beim Response: ' + response.status + ' ' + errorText);
                });
            }
        })
        /*
        In der Funktion werden mögliche Errors bearbeitet.
         */
        .catch(err => {
            console.error('Fehler beim Response:', err);
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