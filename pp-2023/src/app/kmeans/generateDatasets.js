'use client'
//Diese Funktion erstellt den Inhalt des Scattercharts inklusive Datensets / Datenpunkten und Optionen.

// fillInData holt sich die einzelnen Daten aus dem Ergebnis des kMeans algorithmus und verpackt diese in ein Objekt dass das passende Format für Chartjs hat.
const fillInData = (kMeansResult, kMeansOrElbow) => { //pos ist hier die aktuelle position der Schleife bzw. des Clusters aus generateDatasets
    let data = [];
    if (kMeansResult) {
        if (kMeansOrElbow === "Elbow") {
            let variables = {};
            for (let i = 0; i < kMeansResult.length; i++) {
                variables = {
                    x: `${i + 1}`,
                    y: Object.values(kMeansResult[i])
                }
                data.push(variables);
            }
        }
        else {
            let variables = {};
            for (let i = 0; i < kMeansResult.length; i++) {
                // Logik für das Umsetzen mit 2 oder 3 Variablen.
                if (kMeansResult[i].length === 3) {
                    variables = {
                        x: kMeansResult[i][0],
                        y: kMeansResult[i][1],
                        z: kMeansResult[i][2],
                    };
                } else {
                    variables = {
                        x: kMeansResult[i][0],
                        y: kMeansResult[i][1],
                    };
                }
                data.push(variables);
            }
        }
    }

    return data;
}


const generateDatasets = (K, kMeansResult, localOrRemote, kMeansOrElbow) => {
    if (kMeansOrElbow === undefined){
        kMeansOrElbow = "kMeans";
    }
    const datasets = [];
    if (kMeansOrElbow === "kMeans") {
        if (kMeansResult) {
            if (localOrRemote === "local") {
                //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
                for (let i = 0; i <= K - 1; i++) {
                    //diese Abfrage checkt, ob beim Aufruf der Funktion bereits ein Ergebnis des KMeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
                    if (typeof kMeansResult !== 'undefined') {
                        let data = fillInData(kMeansResult.groups[i].cluster);
                        const dataset = {
                            data: data,
                            label: `Set ${i + 1}` //Das Dataset bekommt seinen Namen
                        };
                        datasets.push(dataset);
                    }
                }
            }
            else if (localOrRemote === "remote") {
                //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
                for (let i = 0; i <= K - 1; i++) {
                    //diese Abfrage checkt, ob beim Aufruf der Funktion bereits ein Ergebnis des KMeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
                    if (typeof kMeansResult !== 'undefined') {
                        let data = fillInData(kMeansResult.Cluster[i].data_points);
                        const dataset = {
                            data: data,
                            label: `Set ${i + 1}` //Das Dataset bekommt seinen Namen
                        };
                        datasets.push(dataset);
                    }
                }
            }
        }
        // Hier sind die optionen für die Chart Skalen etc. definiert.
        const options = {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'x-Achse',
                        font: {
                            size: 20,
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'y-Achse',
                        font: {
                            size: 20,
                        }
                    }
                }
            }
        };

        return (
            {
                type: 'scatter',
                data: {
                    datasets: datasets,
                },
                options: options,
            }
        )
    }

    else if (kMeansOrElbow === "Elbow") {
        let dataset;
        if (kMeansResult) {
            if (localOrRemote === "local") {
                //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
                //diese Abfrage checkt, ob beim Aufruf der Funktion bereits ein Ergebnis des KMeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
                if (typeof kMeansResult !== 'undefined') {
                    let data = fillInData(kMeansResult, kMeansOrElbow);
                    dataset = {
                        data: data,
                    };
                }
            }
            /*         else if (localOrRemote === "remote") {
                        //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
                        for (let i = 0; i <= K - 1; i++) {
                            //diese Abfrage checkt, ob beim Aufruf der Funktion bereits ein Ergebnis des KMeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
                            if (typeof kMeansResult !== 'undefined') {
                                let data = fillInData(kMeansResult.Cluster[i].data_points);
                                const dataset = {
                                    data: data,
                                    label: `Set ${i + 1}` //Das Dataset bekommt seinen Namen
                                };
                                generateData.push(dataset);
                            }
                        }
                    } */
        }
        // Hier sind die optionen für die Chart Skalen etc. definiert.
        const options = {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Anzahl K',
                        font: {
                            size: 20,
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Durchschnittliche kumulierte Distanz',
                        font: {
                            size: 20,
                        }
                    }
                }
            }
        };
        return (
            {
                type: 'line',
                data: {
                    datasets: [
                        dataset
                    ]
                },

                options: options,
            }
        )
    }
}
export const gD = {
    fillInData,
    generateDatasets
}