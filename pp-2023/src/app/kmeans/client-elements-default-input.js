'use client'
import {useState, useEffect} from 'react';
import {alertMessage} from '../utils/element-functions';
import {kMeansAlgorithm} from '../utils/kmeans';

// Die Funktion erstell eine Custom Component, welche die Standardinputs für ein File und die Anzahl der K-Punkte enthält.
function CustomElementsDefaultInput() {

    const [inputValueKPoints, setInputValuesKPoints] = useState('');

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

    // Die Funktion wird beim Aufrufen des Submit-Buttons getriggert. Dabei werden die K-Points validiert und anschließend
    // an die kMeans Funktion übergeben.
    const handleButtonSubmitAction = () => {
        const kPoint = validateKPoints(inputValueKPoints);
        if (kPoint) {
            const result = kMeansAlgorithm(dataSet, kPoint)
            console.log(result);
        }
    }

    // Der Input wird an eine Statusvariable übergeben.
    const handleInputKPointsAction = (value) => {
        setInputValuesKPoints((newKPoint) => {
            newKPoint = value;
            return newKPoint;
        });
    }

    // Validierung des K-Points Input
    const validateKPoints = (documentValue) => {
        if (documentValue) {
            return parseInt(documentValue);
        } else {
            alert(alertMessage('Anzahl Cluster'));
            return false;
        }
    }

    // Deklaration von Konstanten mit Klassennamen
    const gridCell = 'grid-cell input-group mb-3';
    const inputK = 'inputK form-control';
    const inputDataFile = 'inputDataFile form-control';
    const btnSubmit = 'btn-submit btn btn-primary';

    return (
        <form id="formKMeans">
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="input-k">Cluster</label>
                <input id="input-k" className={inputK} type={"number"} value={inputValueKPoints} required={true}
                       onChange={event => handleInputKPointsAction(event.target.value)}
                />
            </div>
            <div className={gridCell}>
                <label className='input-group-text' htmlFor="inputDataFile">Datei</label>
                <input id="inputDataFile" className={inputDataFile} type={"file"}/>
            </div>
            <div className={gridCell}>
                <button form="formKmeans" className={btnSubmit} type={"submit"}
                        onClick={event => handleButtonSubmitAction(event)}>Submit
                </button>
            </div>
        </form>
    );
}

export default CustomElementsDefaultInput;