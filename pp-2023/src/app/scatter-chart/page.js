'use client'
import { useEffect } from "react"
import { Chart } from "chart.js/auto";
function Example() {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: [
                        { x: 17, y: 3 },
                    ]
                   

                }, {
                    data: [
                        { x: 10, y: 3},
                    ]
                    

                }, {
                    data: [
                        { x: 4, y: 14},
                    ]
                 
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '# of wins'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '# of games'
                        }
                    }],
                }
            },
        });
    }, [])
    return (
        <>
            {/* Scatter chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Scatter Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;