'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
import { UseInputKPoints } from './input-k-points';
import { generateDatasets } from './generateDatasets';
function ScatterChart() {

    const K = UseInputKPoints();

    // useEffect muss hier wohl verwendet werden, damit der Code zur Erstellung des Diagramms erst nach dem Rendern der Komponente geschiet. (Quelle: ChatGPT)
    useEffect(() => {
        const dataArray = generateDatasets(parseInt(K.numberOfClusters));
       // console.log(JSON.parse(generateDatasets(parseInt(K.numberOfClusters))))
        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, dataArray);
    }, []);

    // returnt direkt html mit unserem chart im Canvas inklusive der Überschrift.
    return (
        <>
            {/* Scatter chart */}
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">Scatter Chart</h1>
            <div className="h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
        
    )
}

export default ScatterChart;