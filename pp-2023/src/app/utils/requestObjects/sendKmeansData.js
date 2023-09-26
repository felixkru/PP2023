
export default function sendKMeansData (kPoints, fileName, centroidPoints, dataPoints) {
    const object = {
            "kMeans_parameters": {
            "k": `${kPoints}`,
            "init": "kmeans++",
            "file": `${fileName}`,
        },
            "centroids": [
                `${centroidPoints}`
        ],
            "data_points": [
                `${dataPoints}`
        ],
    };
    return object;
}