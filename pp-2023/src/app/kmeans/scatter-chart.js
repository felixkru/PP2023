'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
import { UseInputKPoints } from './input-k-points';
import { generateDatasets } from './generateDatasets';
function ScatterChart(numberOfClusters,calledByButton) {

    let myChart;



    const updateChart = () =>{
        const dataArray = generateDatasets(parseInt(numberOfClusters));
        let ctx = document.getElementById('myChart').getContext('2d');
        let chartStatus = Chart.getChart('myChart'); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        myChart = new Chart(ctx, dataArray);
    }

    // Hier wird beim Initialen Laden der Seite das Chart erzeugt und auch wieder mit der destroy funktion zerstört.
    // useEffect wird hier verwendet, damit sichergestellt wird, dass das Chart erst erstellt wird nachdem das DOM komplett erzeugt wurde.
    const initialChart = () =>{
        useEffect(() => {
            updateChart();
        }, []);}

    
    if(calledByButton !== 1){
        initialChart();
    }
    //Wenn die Funktion über den Berechnen Button aufgerufen wurde, dann ist die Variable calledByButton = 1 und daher wird der Canvas ohne useEffect ausgeführt. 
    //Das ist daher notwendig, da Man innerhalb des Hooks vom calculateButton keinen weiteren hook (useEffect) aufrufen kann. 
    else{
       updateChart(); 
    }

    // returnt direkt html mit unserem chart im Canvas inklusive der Überschrift.
    return (
        <>
            {/* Scatter chart */}
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">Scatter Chart</h1>
            <div className="h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'/>
                </div>
            </div>
        </>
        
    )
}

export default ScatterChart;