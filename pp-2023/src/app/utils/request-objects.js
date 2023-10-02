'use client'
const dataForKMeansAlgorithm = (KPointsVariable, fileURL, centroids, dataPoints) => {
    return (
        {
            kmeans_parameters: {
                kPoints : KPointsVariable,
                number_runs : 10,
                init : 'k-means++',
                file : fileURL,
            },
            centroids: centroids,
            data_points: dataPoints,
        }
    );
}

export const dataObjectsForRequest = () => {
    return dataForKMeansAlgorithm()
}