'use Client'
import Image from "next/image";
import {useState} from "react";
import {HandleSwitchVariables} from './switch-variables';

export function DynamicGeneratesInputFiles() {

    const [counterCountAdd, setCounterCountAdd] = useState(2);
    const [disableButton, setDisableButton] = useState(false);
    const [inputDataArray, setInputDataArray] = useState([...[]]);
    const {numberOfVariables, onOptionChange} = HandleSwitchVariables();

    const handleButtonAdd = () => {
        setCounterCountAdd((click) => click + 1);
    };

    const setCorrectHelperValue = (helper) => {
        if (numberOfVariables === 3 && helper > 3) {
            return 1;
        } else if (numberOfVariables !== 3 && helper > 2) {
            return 1;
        }
        return helper;
    }

    const setCorrectRowIndex = (rowIndex, colIndex) => {
        if (colIndex >= numberOfVariables - 1) {
            rowIndex = rowIndex + 1;
        }
        return rowIndex;
    }

    const setCorrectColIndex = (colIndex) => {
        if (colIndex < numberOfVariables - 1) {
            colIndex = colIndex + 1;
        } else {
            colIndex = 0;
        }
        return colIndex;
    }

    const handleInputChange = (rowIndex, colIndex, value) => {
        setInputDataArray((prevDataArray) => {
            const newDataArray = [...prevDataArray];
            if (!newDataArray[rowIndex]) {
                newDataArray[rowIndex] = [];
            }
            newDataArray[rowIndex][colIndex] = value;
            return newDataArray;
        });
    }

    const renderInputElement = (i, helper, colIndex, rowIndex) => (
        <div key={i} className="grid-cell">
            <label className='input-group-text' htmlFor={`inputVector${i}`}>{helper} Variable ...</label>
            <input id={`inputVector${i}`}
                   className={`inputVector${i} form-control`}
                   type={"number"}
                   required={true}
                   aria-rowindex={rowIndex}
                   aria-colindex={colIndex}
                   onChange={event => handleInputChange(rowIndex, colIndex, event.target.value)}
            />
        </div>
    );

    const renderInputs = () => {
        if (numberOfVariables) {
            const newCounter = numberOfVariables * counterCountAdd;
            const inputs = [];
            let helper = 1;
            let rowIndex = 0;
            let colIndex = 0;

            for (let i = 0; i < newCounter; i++) {
                helper = setCorrectHelperValue(helper);
                inputs.push(
                    renderInputElement(i, helper,
                        colIndex, rowIndex)
                );

                rowIndex = setCorrectRowIndex(rowIndex, colIndex);
                colIndex = setCorrectColIndex(colIndex);
                helper = helper + 1;
            }

            return inputs;
        }
    };

    return {
        counterCountAdd,
        handleButtonAdd,
        renderInputs,
    }
}

export function CreateManuelInputFields() {

    const {
        counterCountAdd, handleButtonAdd,
        renderInputs,
    } = DynamicGeneratesInputFiles();

    return (
        <div>
            <section id='vectors' className='mb-5'>
                Hier kommen die Inputs mit den Vektoren hin
            </section>
            {renderInputs()}
            <section id='addVectorButton' className='mb-5'>
                <button type="button"
                        className='plus-button'
                        value={counterCountAdd}
                        onClick={handleButtonAdd}
                >
                    <Image src="/plus-icon.svg" width={50} height={50} alt="Plus Icon"/>
                </button>
            </section>
        </div>
    );
}

