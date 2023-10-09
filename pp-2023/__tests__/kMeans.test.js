import {kMeansAlgorithm} from '../src/app/utils/kmeans';

describe('kmeansAlgorithm', () => {
    /*
    Der Test prüft, ob folgendes ab: Centroids
    1. Die Centroids werden in einem Array zurückgegeben.
    2. Es wird überprüft, ob die Anzahl eines Datenpunktes z.B. drei Variablen
    mit der Anzahl an Punkten des Ergebnisses übereinstimmt.
    3. Es wird überprüft, ob Zahlen ausgegeben werden.

    Der Test prüft, ob folgendes ab: Cluster
    1. Die Cluster werden in einem Array zurückgegeben.
    2. Es wird überprüft, ob die Anzahl eines Datenpunktes z.B. drei Variablen
    mit der Anzahl an Punkten des Ergebnisses übereinstimmt.
    3. Es wird überprüft, ob Zahlen ausgegeben werden.
     */
    it('Centroids-Test ', () => {
        const dataset = [
            [5, 2, 3],
            [5, 1, 2],
            [4, 2, 3],
            [1, 2, 8],
            [4, 2, 9],
            [4, 2, 0],
        ];
        const kPoints = 2;
        const result = kMeansAlgorithm(dataset, kPoints);

        result.groups.forEach((set) => {
            expect(Array.isArray(set.centroid)).toBe(true);
            expect(set.centroid.length === dataset[0].length);
            set.centroid.forEach((centroid) => {
                expect(typeof centroid === "number").toBe(true);
            });
        });
        result.groups.forEach((set) => {
            expect(Array.isArray(set.cluster)).toBe(true);
            expect(set.cluster.length === dataset[0].length);
            set.centroid.forEach((cluster) => {
                expect(typeof cluster === "number").toBe(true);
            });
        });
    });

    /*
    Ist der Parameter KPoints ein string stat einem Integer, soll der Algorithmus weiter funktionieren.
     */
    it(('Cluster-Test'), () => {
        const dataset = [
            [5, 2, 3],
            [5, 1, 2],
            [4, 2, 3],
            [1, 2, 8],
            [4, 2, 9],
            [4, 2, 0],
        ];
        const kPoints = "2";
        const result = kMeansAlgorithm(dataset, kPoints);

        result.groups.forEach((set) => {
            expect(Array.isArray(set.centroid)).toBe(true);
            expect(set.centroid.length === dataset[0].length);
            set.centroid.forEach((centroid) => {
                expect(typeof centroid === "number").toBe(true);
            });
        });
        result.groups.forEach((set) => {
            expect(Array.isArray(set.cluster)).toBe(true);
            expect(set.cluster.length === dataset[0].length);
            set.centroid.forEach((cluster) => {
                expect(typeof cluster === "number").toBe(true);
            });
        });
    });

    //TODO den alert mocken mit JEST

});