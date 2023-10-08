import kMeans from 'node-kmeans';

// Funktion nimmt ein DataSet entgegen, die KPoints und gibt ein Array of Arrays zurück.
export function kMeansAlgorithm(dataset, kPoints) {
    return kMeans.clusterize(dataset, {k: kPoints}, function (err, res) {
        try {
            if (res) {
                return res;
            } else {
                alert("Sie haben weniger Datensätze zur Verfügung gestellt als K-Punkte. " +
                    "Eine Berechnung ist unter diesen Umständen nicht möglich!");
                return false;
            }
        } catch (err) {
            throw new Error(err);
        }
    });
}

