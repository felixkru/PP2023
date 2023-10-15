import { euclideanDistance, SummeDerDistanzen } from '../src/app/kmeans/elbow-kriteria';

describe('euclideanDistance function', () => {
    it('should calculate the Euclidean distance between two points of the same dimension', () => {
        const point1 = [1, 2, 3];
        const point2 = [4, 5, 6];

        expect(euclideanDistance(point1, point2)).toBeCloseTo(5.196, 3);
    });
})

describe('SummeDerDistanzen function', () => {
    it('should calculate the sum of distances for multiple groups', () => {
        const groups = [
            {
                cluster: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
                centroid: [4, 5, 6],
            },
            {
                cluster: [[2, 3, 4], [5, 6, 7], [8, 9, 10]],
                centroid: [6, 7, 8],
            }
        ];
        expect(SummeDerDistanzen(groups)).toBeCloseTo(22.516, 2);
    });
});