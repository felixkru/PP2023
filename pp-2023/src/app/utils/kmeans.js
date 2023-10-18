import kMeans from "node-kmeans";
import {APIError} from "../utils/userErrors";
import {useLoadingStatus} from "../common/LoadingScreen";

// Funktion nimmt ein DataSet entgegen, die KPoints und gibt ein Array of Arrays zurück.
export function kMeansAlgorithm(dataset, kPoints) {
    return kMeans.clusterize(dataset, {k: kPoints}, function (err, res) {
        try {
            if (res === undefined) {
                const error =
                    "Bitte überprüfen Sie Ihre Eingegeben Daten!" +
                    " Eine Berechnung mit Ihrem aktuellen Datensatz ist nicht möglich.";
                APIError(error);
                return false;
            } else {
                return res;
            }
        } catch (err) {
            //   stopLoading();
            throw new Error(err);
        }
    });
}
