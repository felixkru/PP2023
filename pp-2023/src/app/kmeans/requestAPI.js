'use client'
export const apiPostRequest = (url, formData, KPoints) => {
    const numberKRuns = '&number_kmeans_runs=20';
    const newKForGet = 'k=' + KPoints;
    const urlBearbeitet = url + '?' + newKForGet + numberKRuns;

    return fetch(urlBearbeitet, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Fehler bei der Anfrage:', error);
            throw error;
        });
};

export const exportFunctionDataForKMeans = (urlKMeans, data, kPoints) => {
    return apiPostRequest(urlKMeans, data, kPoints);
};