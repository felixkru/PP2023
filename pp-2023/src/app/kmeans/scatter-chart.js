'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
import { gD } from './generateDatasets';
import '../globals.css';

function ScatterChart(numberOfClusters, calledByButton, kMeansResult, localOrRemote) {

    let myChart;

    const UpdateChart = () => {
        const chartData = gD.generateDatasets(parseInt(numberOfClusters), kMeansResult, localOrRemote);
        const ctx = document.getElementById('myChart').getContext('2d');
        const chartStatus = Chart.getChart('myChart'); // <canvas> id
        if (chartStatus !== undefined) {   //der Status ist undefined wenn kein Chart auf dem Canvas existiert, falls eins existiert wird es hier dann zerstört.
            chartStatus.destroy();
        }
        myChart = new Chart(ctx, chartData);
    }

    // Hier wird beim Initialen Laden der Seite das Chart erzeugt
    // useEffect wird hier verwendet, damit sichergestellt wird, dass das Chart erst erstellt wird nachdem das DOM komplett erzeugt wurde.
    const InitialChart = () => {
        useEffect(() => {
            UpdateChart();
        }, []);
    }


    // Überprüft ob Seite initial geladen wurde oder ob die calledByButton Variable mitgegeben wurde -> also durch calculate Button ausgelöst
    if (calledByButton !== 1) {
        InitialChart();
    }
    else {
        UpdateChart();
    }

    // returnt direkt html mit unserem chart im Canvas inklusive der Überschrift.
    return (
        <div id="scatterChartContainer">
            <h1 className="mx-auto my-8 text-xl font-semibold capitalize ">Scatter Chart</h1>
            <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit shadow-xl'>
                <canvas id='myChart' />
            </div>
        </div>

    )
}

export default ScatterChart;