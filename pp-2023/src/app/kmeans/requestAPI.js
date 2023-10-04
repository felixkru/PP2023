'use client'
import CSV_FILE from '../utils/test.csv';

export const apiPostRequest = (url, KPoints) => {
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
        Rückgabe des Response.
         */
        .then(data => {
            return data;
        })
        /*
        Behandlung möglocher Fehler.
         */
        .catch(error => {
            console.error('Fehler bei der Anfrage:', error);
            throw error;
        });
};

export const exportFunctionDataForKMeans = (urlKMeans, kPoints) => {
    return apiPostRequest(urlKMeans, kPoints);
};