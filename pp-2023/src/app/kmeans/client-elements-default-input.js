'use client'
import {useState, useEffect} from 'react';
import {getElementByClass, getValueByClass, alertMessage} from '../utils/element-functions';
import {kMeansAlgorithm} from '../utils/kmeans';

// Die Funktion erstell eine Custom Component, welche die Standardinputs für ein File und die Anzahl der K-Punkte enthält.
function CustomElementsDefaultInput() {

    // Validierung des K-Points Input
    const validateKPoints = (documentValue) => {
        if (documentValue) {
            return documentValue;
        } else {
            alert(alertMessage('Anzahl Cluster'));
            return false;
        }
    }

    // DataSet zum Testen
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

    useEffect(() => {
        const button = getElementByClass('.btn-submit');
        // Funktion prüft erst die Eingabe der K-Points, anschließend wird der K-Means-Algorithmus ausgeführt
        const handleKMeans = () => {
            const kValue = getValueByClass('.inputK');
            if (validateKPoints(kValue)) {
                // TODO den Consol-Befehel ersetzten durch Visualisierung
                console.log(kValue);
                kMeansAlgorithm(dataSet, parseInt(kValue));
            }
        };
        button.addEventListener('click', handleKMeans);
        return () => {
            button.removeEventListener('click', handleKMeans);
        }
    }, []);

    // Deklaration von Konstanten mit Klassennamen
    const gridCell = 'grid-cell input-group mb-3';
    const inputK = 'inputK form-control';
    const inputDataFile = 'inputDataFile form-control';
    const btnSubmit = 'btn-submit btn btn-primary';

    return (
        <form id="formKMeans">
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="input-k">Cluster</label>
                <input id="input-k" className={inputK} type={"number"} required={true}/>
            </div>
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="inputDataFile">Datei</label>
                <input id="inputDataFile" className={inputDataFile} type={"file"}/>
            </div>
            <div className={gridCell}>
                <button form="formKmeans" className={btnSubmit} type={"submit"}>Submit</button>
            </div>
        </form>
    );
}

export default CustomElementsDefaultInput;