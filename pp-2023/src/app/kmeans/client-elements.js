'use client'
import {useState, useEffect} from 'react';
import {getElementByClass, getValueByClass} from '../utils/element-functions';
import {kMeansAlgorithm} from '../utils/kmeans';

function CustomElements() {

    const gridRow = 'row';
    const gridColumn = 'col-12 col-md-6';
    const gridCell = 'grid-cell';
    const inputK = 'inputK';
    const inputDataFile = 'inputDataFile';
    const btnSubmit = 'btn-submit'

    const dataSet = [
        [2, 3, 4],
        [2, 4, 3],
        [3, 3, 3],
        [4, 5, 6],
        [5, 4, 5],
        [6, 5, 7],
        [9, 7, 8],
        [10, 8, 9],
        [11, 8, 8],
    ];

    let kPoints = 2;

    useEffect(() => {
        const button = getElementByClass('.btn-submit');
        button.addEventListener('click', () => {
            const kValue = getValueByClass('.inputK');
            if (kValue) {
                kPoints = parseInt(kValue);
            }
            console.log(kPoints);
            kMeansAlgorithm(dataSet, kPoints);

        });
    }, []);

    return (
        <div className={gridRow}>
            <div className={gridColumn}>
                <form id="formKMeans">
                    <div className={gridCell}>
                        <label htmlFor="input-k">Bitte geben Sie Ihre Anzahl Cluster an:</label>
                        <input id="input-k" className={inputK} type={"number"} required={true}/>
                    </div>
                    <div className={gridCell}>
                        <label htmlFor="inputDataFile">Bittel laden Sie Ihre XLSX oder CSV Datei hoch:</label>
                        <input id="inputDataFile" className={inputDataFile} type={"file"}/>
                    </div>
                    <div className={gridCell}>
                        <button form="formKmeans" className={btnSubmit} type={"submit"}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomElements;