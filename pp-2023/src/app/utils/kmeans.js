import kMeans from 'kmeansjs';

// Funktion nimmt ein DataSet entgegen, die KPoints und gibt ein Array of Arrays zurück.
export function kMeansAlgorithm(dataset, kPoints) {
    return kMeans(dataset, kPoints, function (err, res) {
        try {
            return res;

        } catch (err) {
            throw new Error(err);
        }
    });
}

