'use client'

export function generateDatasets(K) {
    const datasets = [];

    for (let i = 1; i <= K; i++) {
        const dataset = {
            data: [
                { x: Math.random() * 20, y: Math.random() * 20 },
                { x: Math.random() * 20, y: Math.random() * 20 }
            ],
            label: `Set ${i}`
        };

        datasets.push(dataset);
    }
    const options = {
        responsive: true,
        // Hier können Einstellungen für die Scalen beschriftung gemacht werden
        scales: {
            x:{
                display: true,
                title:{
                    display: true,
                    text: 'x-Achse',
                    //color: '#9312',
                    font: {
                        //hier können font inklusive schriftgröße etc. eingestellt werden.
                        size: 20,

                    }
                }
            },
            y:{
                display: true,
                title:{
                    display: true,
                    text: 'y-Achse',
                    font: {
                        size: 20, 
                    }
                }
            }
        }
    }
    datasets.push(options);

    const datasetsJson = JSON.stringify(datasets);
    //console.log(datasetsJson);
    //console.log(datasets);
    return {
        datasets
    };
}

