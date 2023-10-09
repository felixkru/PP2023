'use client'
//Diese Funktion erstellt den Inhalt des Scattercharts inklusive Datensets / Datenpunkten und Optionen.

// fillInData holt sich die einzelnen Daten aus dem Ergebnis des kMeans algorithmus und verpackt diese in ein Objekt dass das passende Format für Chartjs hat.
const fillInData = (kMeansResult) => { //pos ist hier die aktuelle position der Schleife bzw. des Clusters aus generateDatasets

    let data = [];
    if (kMeansResult) {
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
    return data;
}


export function generateDatasets(K, kMeansResult) {
    const generateData = [];
    //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
    for (let i = 0; i <= K - 1; i++) {
        //diese Abfrage checkt, ob beim Aufruf der Funktion bereits ein Ergebnis des KMeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
        if (typeof kMeansResult !== 'undefined') {
            let data = fillInData(kMeansResult.groups[i].cluster);
            const dataset = {
                data: data,
                label: `Set ${i + 1}` //Das Dataset bekommt seinen Namen
            };
            generateData.push(dataset);
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
                datasets: generateData,
            },
            options: options,
        }
    )
}