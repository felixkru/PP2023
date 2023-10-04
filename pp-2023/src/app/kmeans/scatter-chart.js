'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
import { UseInputKPoints } from './input-k-points';
import { generateDatasets } from './generateDatasets';

function ScatterChart(numberOfClusters,calledByButton,kMeansResult) {

    let myChart;

    const UpdateChart = () =>{
        const chartData = generateDatasets(parseInt(numberOfClusters),kMeansResult);
        const ctx = document.getElementById('myChart').getContext('2d');
        const chartStatus = Chart.getChart('myChart'); // <canvas> id
        if (chartStatus !== undefined) {   //der Status ist undefined wenn kein Chart auf dem Canvas existiert, falls eins existiert wird es hier dann zerstört.
          chartStatus.destroy();
        }
        myChart = new Chart(ctx, chartData);
    }

    // Hier wird beim Initialen Laden der Seite das Chart erzeugt
    // useEffect wird hier verwendet, damit sichergestellt wird, dass das Chart erst erstellt wird nachdem das DOM komplett erzeugt wurde.
    const InitialChart = () =>{
        useEffect(() => {
            UpdateChart();
        }, []);}

    
    // Überprüft ob Seite initial geladen wurde oder ob die calledByButton Variable mitgegeben wurde -> also durch calculate Button ausgelöst
    if(calledByButton !== 1){
        InitialChart();
    }
    else{
       UpdateChart(); 
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