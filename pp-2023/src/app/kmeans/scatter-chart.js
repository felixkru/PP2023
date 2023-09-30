'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
function ScatterChart() {
    // useEffect muss hier wohl verwendet werden, damit der Code zur Erstellung des Diagramms erst nach dem Rendern der Komponente geschiet. (Quelle: ChatGPT)
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'scatter',
            // hier sind die verschiedenen Datensets, alle Punkte eines Datensets welches mit "data:" beginnt bekommen die gleiche Farbe.
            data: {
                datasets: [{
                    data: [
                        { x: 17, y: 3 },
                        { x: 11, y: 3 } 
                    ],
                   label: "Set 1"

                }, {
                    data: [
                        { x: 10, y: 3},
                    ],
                    label: "Set 2"

                }, {
                    data: [
                        { x: 4, y: 14},
                    ],
                    label: "Set 3"
                },
                {
                    data: [
                        { x: 3, y: 11 }
                    ],
                    label: "Set 4"
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: 'x-Achse'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'y-Achse'
                        }
                    }],
                }
            },
        });
    }, [])
    return (
        <>
            {/* Scatter chart */}
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">Scatter Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default ScatterChart;