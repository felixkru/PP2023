import { render, screen } from '@testing-library/react'
import { gD } from '../src/app/kmeans/generateDatasets'
import '@testing-library/jest-dom'

// AAA Pattern -> Arrange, Act, Assert

 
describe('fillInData', () => {
  it('should return formatted data', () => {
    // Arrange
    const kMeansResult = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    // Act
    const result = gD.fillInData(kMeansResult);

    // Assert
    const expectedOutput = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ];

    expect(result).toEqual(expectedOutput);
  })

  it('should handle 3-variable data correctly', () => {
    // Arrange
    const kMeansResult = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    // Act
    const result = gD.fillInData(kMeansResult);

    // Assert
    const expectedOutput = [
      { x: 1, y: 2, z: 3 },
      { x: 4, y: 5, z: 6 },
    ];

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    // Arrange
    const kMeansResult = [];

    // Act
    const result = gD.fillInData(kMeansResult);

    // Assert
    const expectedOutput = [];

    expect(result).toEqual(expectedOutput);
  });
})

describe('generateDatasets', () => {
  it('should return empty datasets when no kMeansResult is given', () => {
    // Arrange
    const expectedOutput = {
      type: 'scatter',
      data: {
          datasets: [],
      },
      options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'x-Achse',
                    font: {
                        size: 20,
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y-Achse',
                    font: {
                        size: 20,
                    }
                }
            }
        },
      }
    }
    // Act
    const result = gD.generateDatasets(2)
    // Assert
    expect(result.data.datasets.length).toEqual(0)
    expect(result).toEqual(expectedOutput)
  })

  it('should generate datasets with correct labels', () => {
    // Arrange: Eingaben mocken
    const K = 3;
    const kMeansResult = {
      groups: [
        { cluster: [[1, 2], [3, 4]] },
        { cluster: [[5, 6], [7, 8]] },
        { cluster: [[9, 10], [11, 12]] },
      ],
    };

    // Arrange: fillInData-Funktion mocken, da die generateDataSets aufgerufen wird
    const fillInDataMock = jest.fn((cluster) => cluster.map((point) => ({ x: point[0], y: point[1] })));

    // Arrange: Originale Funktion ersetzen
    gD.fillInData = fillInDataMock;

    // Act
    const result = gD.generateDatasets(K, kMeansResult);

    // Assert
    expect(fillInDataMock).toHaveBeenCalledTimes(K);

    const expectedOutput = {
      type: 'scatter',
      data: {
        datasets: [
          { data: fillInDataMock(kMeansResult.groups[0].cluster), label: 'Set 1' },
          { data: fillInDataMock(kMeansResult.groups[1].cluster), label: 'Set 2' },
          { data: fillInDataMock(kMeansResult.groups[2].cluster), label: 'Set 3' },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'x-Achse',
              font: {
                size: 20,
              },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'y-Achse',
              font: {
                size: 20,
              },
            },
          },
        },
      },
    };

    // Assert
    expect(result).toEqual(expectedOutput);
  });
})