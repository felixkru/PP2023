import kMeans from 'node_modules/kmeansjs'

// the function takes a dataset and a k-value, the return is an array of arrays.
export function kMeansAlgorithm(dataset, k) {
    kMeans(dataset, k, function (err, res) {
        try {
            return res;
        } catch (err) {
            throw new Error(err);
        }
    });
}

