'use client'

import {useState, useEffect} from 'react';
import {getElementByClass, getValueByClass, alertMessage} from '../utils/element-functions';

function CustomElementsCustomizedInput() {

    const [countInputs, setCountInputs] = useState(2);
    const [counter, setCounter] = useState(2)

    useEffect(() => {
        const buttonChange = document.querySelector('.btn-change-cluster');
        buttonChange.addEventListener('click', () => {
            if (counter % 2 === 0) {
                buttonChange.innerHTML = '2 Vektoren';
                setCounter(3);
            } else {
                buttonChange.innerHTML = '3 Vektoren';
                setCounter(2);
            }
        });

    }, [counter]);

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < counter; i++) {
            inputs.push(
                <div key={i} className={gridCell}>
                    <label className='input-group-text' htmlFor={`inputVector${i}`}>Vektor {i}</label>
                    <input id={`inputVector${i}`} className={`inputVector${i} form-control`} type={"number"}
                           required={true}/>
                </div>
            );
        }
        return inputs;
    };

    const gridCell = 'grid-cell input-group mb-3';
    const btnSubmit = 'btn-submit btn btn-primary';
    const btnChangeCluster = 'btn-change-cluster btn btn-primary';

    return (
        <form id="formManuelInput">
            <div className={gridCell}>
                <button className={btnChangeCluster} type={"button"}>3 Vektoren</button>
            </div>
            {renderInputs()}
            <div className={gridCell}>
                <button form="" className={btnSubmit} type={"submit"}>Submit</button>
            </div>
        </form>
    );
}

export default CustomElementsCustomizedInput;