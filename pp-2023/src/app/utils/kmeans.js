import kMeans from 'kmeansjs';

// the function takes a dataset and a k-value, the return is an array of arrays.
export function kMeansAlgorithm(dataset, kPoints) {
    kMeans(dataset, kPoints, function (err, res) {
        try {
            console.log(res)

        } catch (err) {
            throw new Error(err);
        }
    });
}

