import {euclideanDistance, SummeDerDistanzen, CreateArrayOfDistances,
    CalculateElbowKriteria, CreateResultObject, CreateAPICallResultObject,
    CreateElbowCriteriaElements} from '../src/app/kmeans/elbow-kriteria';
import {returnExcel, calculateExcel} from '../src/app/utils/excelfilereader';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';

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

describe('CreateArrayOfDistances', () => {
    it('should calculate distances for K values', async () => {
        const kPunkteMax = 3;
        const dataset = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
        ];

        const distances = await CreateArrayOfDistances(kPunkteMax, dataset);

        expect(distances).toBeInstanceOf(Array);
        expect(distances).toHaveLength(3);
    });
});

describe('CreateResultObject', () => {
    it('should create an array of objects with numeric keys', () => {
        const result = [10, 20, 30];
        const expectedResult = [
            { 1: 10 },
            { 2: 20 },
            { 3: 30 },
        ];

        const createdObjects = CreateResultObject(result);

        expect(createdObjects).toEqual(expectedResult);
    });
});

describe('CreateAPICallResultObject', () => {
    it('should create an array of objects from key-value pairs', () => {
        const result = {key1: 'value1', key2: 'value2', key3: 'value3'};
        const expectedArray = [
            {key1: 'value1'},
            {key2: 'value2'},
            {key3: 'value3'},
        ];

        const createdArray = CreateAPICallResultObject(result);

        expect(createdArray).toEqual(expectedArray);
    });
});
