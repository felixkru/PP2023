'use client'
//Diese Funktion erstellt den Inhalt des Scattercharts inklusive Datensets / Datenpunkten und Optionen.

let numberOfVariables = 2;

const fillInData = (pos,kMeansResult) => {
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

        if (typeof kMeansResult === 'undefined'){
            console.log("noch ists leer");
        }
        else{
           let data = fillInData(i,kMeansResult);
           console.log(data);
           const dataset = {
            data: data,
            label: `Set ${i}` //Das Dataset bekommt seinen Namen
        };
        generateData.push(dataset);
        }

        
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



   /* if (typeof kMeansResult === 'undefined'){
        console.log("noch ists leer");
    }
    else{
        if(kMeansResult.cluster[1]){
        console.log("ich bins darian", kMeansResult.cluster[1].length);
        console.log("ich bins kukas", kMeansResult.cluster[0][0].length);
        }
    }*/


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