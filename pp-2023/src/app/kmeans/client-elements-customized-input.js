'use client'
import {useState, useEffect} from 'react';
import {getElementByClass, getValueByClass, alertMessage} from '../utils/element-functions';

// Funktion erstellt eine Custom Component, die für die Eingabe von händischen Werten zuständig ist.
function CustomElementsCustomizedInput() {

    // Deklaration der Zustandsvariablen
    const [counterCountFiles, setCounterCountFiles] = useState(3);
    const [counterCountAdd, setCounterCountAdd] = useState(2);
    const [buttonInnerText, setButtonInnerText] = useState('2 Punkte');
    const [inputValues, setInputValues] = useState([]);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {


    }, []);

    // Funktion legt fest, ob 2 oder 3 Button angezeigt werden.
    const handleButtonPoints = () => {
        setButtonInnerText((text) =>
            text === '3 Punkte' ? '2 Punkte' : '3 Punkte');
        setCounterCountFiles((count) =>
            count === 2 ? 3 : 2);
        renderInputs();
    };

    const handleInputChange = (index, value) => {


    };

    const handleButtonAdd = () => {
        setCounterCountAdd((click) =>
        counterCountAdd + 1);
    };

    // Funktion erstellt eine HelperVariable die die Werte von 1-3 annimmt.
    const setCorrectHelperValue = (helper) => {
        if (counterCountFiles === 3 && helper > 3) {
            return 1;
        } else if (counterCountFiles !== 3 && helper > 2) {
            return 1;
        }
        return helper;
    }

    // Die Funktion rendert dynamische Inputs
    // i = aktueller unique Index und Key, helper = Hiflsvariable für die Beschriftung,
    // inputValue = Wertevariable des aktuellen Feldes, handleInputChange = Funktion
    const renderInputElement = (i, helper, inputValue, handleInputChange) => (
        <div key={i} className={gridCell}>
            <label className='input-group-text' htmlFor={`inputVector${i}`}>{helper} Variable ...</label>
            <input id={`inputVector${i}`}
                   className={`inputVector${i} form-control`}
                   type={"number"}
                   required={true}
                   value={inputValues[i]}
                   onChange={ (event) => handleInputChange(i, event.target.value)}
            />
        </div>
    );

    // Funktion generiert Input Elemente durch Aufruf von renderInputElement mit den korrekten Parametern
    // inputValuesMatrix wird zurückgegeben mit den entsprechenden Werten
    const renderInputs = () => {
        const inputValuesMatrix = [];
        if (counterCountFiles) {
            const newCounter = counterCountFiles * counterCountAdd;
            const inputs = [];
            let helper = 1;

            for (let i = 0; i < newCounter; i++) {
                helper = setCorrectHelperValue(helper);
                inputs.push(
                    renderInputElement(i, helper, inputValues[i], handleInputChange)
                );
                helper = helper + 1;
            }
            return inputs;
        }
        return inputValuesMatrix;
    };

    // Deklaration von Konstanten mit Klassennamen
    const gridCell = 'grid-cell input-group mb-3';
    const btnChangeCluster = 'btn-change-cluster btn btn-primary';
    const btnAddCluster = 'btn-add--Cluster btn btn-primary'

    return (
        <form id="formManuelInput">
            <div className={gridCell}>
                <button onClick={handleButtonPoints} className={btnChangeCluster} type={"button"} disabled={disableButton}>{buttonInnerText}</button>
            </div>
            {renderInputs()}
            <div className={gridCell}>
                <button onClick={handleButtonAdd} className={btnAddCluster} type={"button"}>Add</button>
            </div>
        </form>
    );
}

export default CustomElementsCustomizedInput;