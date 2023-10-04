'use client'
import CSV_FILE from '../utils/test.csv';

export const apiPostRequest = (KPoints, inputDataSrc) => {

    console.log(inputDataSrc);
    /*
    Erstellung eines Form-Data Objektes. Innerhalb des Objektes können mittels eines Key, Value Verfahren
    einzelne Datei-Objekte erstellt werden.
     */
    const formData = new FormData();
    const file = new Blob([CSV_FILE], {type: 'text/csv'});
    formData.append('file', file, 'test.csv');

    /*
    Die Url wird dynamisch generiert. Grund ist die Anforderung aus dem Backend, dass Parameter als Get übergeben werden,
    nur die Dateien werden mittels als Post übergeben.
     */
    const numberKRuns = '&number_kmeans_runs=20';
    const url = "https://kmeans-backend-dev-u3yl6y3tyq-ew.a.run.app/kmeans/";
    const newKForGet = 'k=' + KPoints;
    const urlBearbeitet = url + '?' + newKForGet + numberKRuns;

    return fetch(urlBearbeitet, {
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
        Behandlung möglocher Fehler.
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
        taskId = 'c3f3f58a-8c24-446e-aa30-ea1fc8857acc';
    }
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
        taskId = 'c3f3f58a-8c24-446e-aa30-ea1fc8857acc';
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

export const exportFunctionDataForKMeans = (kPoints, inputDataSrc, taskId) => {
    return (
        apiPostRequest(kPoints, inputDataSrc),
        apiGetStateOfTask(taskId),
        apiGetResult(taskId)
    );
};