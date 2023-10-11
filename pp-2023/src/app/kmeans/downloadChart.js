import { Chart } from "chart.js/auto";

let a = {};
let done = false;

export function GenerateImage(){
    const chartStatus = Chart.getChart('myChart');
    let image = chartStatus.toBase64Image('image/jpeg', 1);
    console.log(image);
    done = true;
    if (done) {
        return(
            <button onClick={downloadChart(image)}>Download Chart</button>
        )
    } else {
        return null;
    }
}

function downloadChart(image){
    a = document.createElement('a');
    a.href = image;
    a.download = 'chart.jpeg';
    a.click();
}

// Komponente, die gerendert wird
export function DownloadButton(){
    return(
        <button href={a}>Download Chart</button>
    )

    
}