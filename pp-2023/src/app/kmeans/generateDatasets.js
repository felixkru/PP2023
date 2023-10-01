'use client'

export function generateDatasets(K) {
    const generateData = [];

    for (let i = 1; i <= K; i++) {
        const dataset = {
            data: [
                { x: Math.random() * 20, y: Math.random() * 20 },
                { x: Math.random() * 20, y: Math.random() * 20 }
            ],
            label: `Set ${i}`
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