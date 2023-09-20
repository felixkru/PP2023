'use client'
import {useState, useEffect} from 'react';
import {getElementByClass, getValueByClass} from '../utils/element-functions';
import {kMeansAlgorithm} from '../utils/kmeans';

function CustomElements() {

    const gridCell = 'grid-cell input-group mb-3';
    const inputK = 'inputK form-control';
    const inputDataFile = 'inputDataFile form-control';
    const btnSubmit = 'btn-submit btn btn-primary'

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
        <form id="formKMeans">
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="input-k">Bitte geben Sie Ihre Anzahl Cluster an:</label>
                <input id="input-k" className={inputK} type={"number"} required={true}/>
            </div>
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="inputDataFile">Bittel laden Sie Ihre XLSX oder CSV Datei hoch:</label>
                <input id="inputDataFile" className={inputDataFile} type={"file"}/>
            </div>
            <div className={gridCell}>
                <button form="formKmeans" className={btnSubmit} type={"submit"}>Submit</button>
            </div>
        </form>
    );
}

export default CustomElements;