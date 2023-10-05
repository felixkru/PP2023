import {kMeansAlgorithm} from '../src/app/utils/kmeans';

describe('kmeansAlgorithm', () => {
    it('should ', () => {
        const dataset = [
            [5,2,3],
            [5,1,2],
            [4,2,3],
            [1,2,8],
            [4,2,9],
            [4,2,0],
        ];
        const kPoints = 5;
        const result = kMeansAlgorithm(dataset, kPoints);

        expect()
    });
})