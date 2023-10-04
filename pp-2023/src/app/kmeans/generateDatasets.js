'use client'
//Diese Funktion erstellt den Inhalt des Scattercharts inklusive Datensets / Datenpunkten und Optionen.


// fillInData holt sich die einzelnen Daten aus dem Ergebnis des kMeans algorithmus und verpackt diese in ein Objekt dass das passende Format für Chartjs hat.
const fillInData = (pos,kMeansResult) => { //pos ist hier die aktuelle position der Schleife bzw. des Clusters aus generateDatasets
    pos = pos-1;
    let data = [];
    if(kMeansResult.cluster[pos]){
        for (let x = 0; x < kMeansResult.cluster[pos].length; x++){
                let variables = {
                    x: kMeansResult.cluster[pos][x][0], y: kMeansResult.cluster[pos][x][1]
                }
                data.push(variables);
        }
}
return data;
}


export function generateDatasets(K,kMeansResult) {
    const generateData = [];
    //Schleife fügt dem Array 'dataset' soviele Datasets hinzu wie Ks vom User angegeben wurden.
    for (let i = 1; i <= K; i++) {

        //diese Abfrage checkt ob beim Aufruf der Funktion bereits ein Ergebnis des Kmeans algorithmus vorliegt, falls nicht werden keine Daten an das Chart übergeben
        if (typeof kMeansResult !== 'undefined'){
            let data = fillInData(i,kMeansResult);
            console.log(data);
            const dataset = {
             data: data,
             label: `Set ${i}` //Das Dataset bekommt seinen Namen
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