'use client'
//Diese Funktion erstellt den Inhalt des Scattercharts inklusive Datensets / Datenpunkten und Optionen.
export function generateDatasets(K) {
    const generateData = [];
    //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
    for (let i = 1; i <= K; i++) {
        const dataset = {
            data: [
                { x: Math.random() * 20, y: Math.random() * 20 }, //Aktuell werden hier noch Zufallszahlen generiert.
                { x: Math.random() * 20, y: Math.random() * 20 }
            ],
            label: `Set ${i}` //Das Dataset bekommt seinen Namen
        };

        generateData.push(dataset);
    }

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