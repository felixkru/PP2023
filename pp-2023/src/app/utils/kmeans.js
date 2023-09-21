import kMeans from 'kmeansjs';

// Funktion nimmt ein DataSet entgegen, die KPoints und returnt ein Array of Arrays.
export function kMeansAlgorithm(dataSet, kPoints) {
    kMeans(dataSet, kPoints, function (err, res) {
        try {
            console.log(res)

        } catch (err) {
            throw new Error(err);
        }
    });
}

