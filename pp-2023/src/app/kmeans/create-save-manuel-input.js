'use Client'
import Image from "next/image";
import {useState, createContext, useContext} from "react";
import {HandleSwitchVariables} from './switch-variables';

/*
    Damit die State-Hooks in anderen Komponenten mit dem aktuellen Status verwendet werden können, wird der Kontext-Hook
    verwendet.
*/
const DynamicGeneratedInputFields = createContext();
export function HandleDynamicGeneratedInputFieldsProvider({children}) {

    const [counterCountAdd, setCounterCountAdd] = useState(2);
    const [inputDataArray, setInputDataArray] = useState([...[]]);
    const {numberOfVariables, onOptionChange} = HandleSwitchVariables();

    /*
    handleButtonAdd setzt den Wert von counterCountAdd um 1 höher.
     */
    const handleButtonAdd = () => {
        setCounterCountAdd((click) => click + 1);
    };

    /*
    setCorrectHelperValue setzt einen Hilfswert, welcher je nach Bedingung Werte zwischen 1 und 3 annehmen kann.
     */
    const setCorrectHelperValue = (helper) => {
        if (numberOfVariables === 3 && helper > 3) {
            return 1;
        } else if (numberOfVariables !== 3 && helper > 2) {
            return 1;
        }
        return helper;
    }

    /*
    setCorrectRowIndex setzt einen Row-Index, welcher für die Initialisierung eines Mehrdimensionalen-Arrays benötigt
    wird.
     */
    const setCorrectRowIndex = (rowIndex, colIndex) => {
        if (colIndex >= numberOfVariables - 1) {
            rowIndex = rowIndex + 1;
        }
        return rowIndex;
    }

    /*
    setCorrectRowIndex setzt einen Col-Index, welcher für die Initialisierung eines Mehrdimensionalen-Arrays benötigt
    wird.
     */
    const setCorrectColIndex = (colIndex) => {
        if (colIndex < numberOfVariables - 1) {
            colIndex = colIndex + 1;
        } else {
            colIndex = 0;
        }
        return colIndex;
    }

    /*
    handleInputChange bekommt einen Row- und Col-Index. Damit wird ein Mehrdimensionales Array befüllt. Dieses
    dient zur manuellen Werteingabe.
     */
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

    /*
    renderInputElement rendert HTML-Elemente. Dabei wird ein unique Key als i gesetzt.
    Der Helper dient dazu, entweder 2 oder 3 Inputs pro Reihe zu generieren. Col- und Row-Index geben Parameter für die
    Wertzuweisung in einem Mehrdimensionalen Array mit.
     */
    const renderInputElement = (i, helper, colIndex, rowIndex) => (
        <div key={i} className="grid-cell">
            <label className='input-group-text' htmlFor={`inputVector${i}`}>{helper} Variable ...</label>
            <input id={`inputVector${i}`}
                   className={`inputVector${i} form-control input-vektor-get`}
                   type={"number"}
                   required={true}
                   aria-rowindex={rowIndex}
                   aria-colindex={colIndex}
                   onChange={event => handleInputChange(rowIndex, colIndex, parseInt(event.target.value))}
            />
        </div>
    );

    /*
    renderInputs ruft renderInputElement mit den entsprechenden Parametern auf. Die Variable Counter berechnet dabei die
    Gesamtanzahl an zu generierenden Inputs.
     */
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

    return (
        <DynamicGeneratedInputFields.Provider value={{renderInputs, handleButtonAdd, counterCountAdd,
            inputDataArray, handleInputChange}}>
            {children}
        </DynamicGeneratedInputFields.Provider>
    );
}

/*
    UseInputKPoints gibt den Status inputDataArray,counterCountAdd, sowie die Methoden renderInputs, handleButtonAdd,
    handleInputChange global frei.
 */
export const HandleDynamicGeneratedInputFields = () => {
    return useContext(DynamicGeneratedInputFields);
}
export function CreateManuelInputFields() {

    const {
        counterCountAdd, handleButtonAdd, renderInputs,
    } = HandleDynamicGeneratedInputFields();

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

