'use client'
import {useState, createContext, useContext} from "react";

const HandleSwitchVariablesContext = createContext();

export function HandeleSwitchVariablesProvider({children}) {

    const [numberOfVariables, setNumberOfVariables] = useState(2);

    const onOptionChange = (newValue) => {
        setNumberOfVariables(parseInt(newValue));
    };

    return (
        <HandleSwitchVariablesContext.Provider value={{numberOfVariables, onOptionChange}}>
            {children}
        </HandleSwitchVariablesContext.Provider>
    );
}

export const HandleSwitchVariables = () => {
    return useContext(HandleSwitchVariablesContext);
}

export function SwitchVariables() {

    let {numberOfVariables, onOptionChange} = HandleSwitchVariables();

    return (
        <div className='number-of-variables-container text-start'>
            <p>Anzahl der Variablen</p>
            <div className='variable-card card-style'>
                <div className="form-check">

                    <input className="variable-radio-input" type="radio" name="flexRadioDefault"
                           id="flexRadioTwoVariables" value={2} checked={numberOfVariables === 2}
                           onChange={(event) => onOptionChange(event.target.value)}/>
                    <label className={'form-check-label ' + (numberOfVariables === 2 ? 'active-element' : null)}
                           htmlFor="flexRadioTwoVariables">
                        Zwei Variablen
                    </label>
                </div>
                <div className="form-check">
                    <input className="variable-radio-input" type="radio" name="flexRadioDefault"
                           id="flexRadioThreeVariables" value={3} checked={numberOfVariables === 3}
                           onChange={(event) => onOptionChange(event.target.value)}/>
                    <label className={'form-check-label ' + (numberOfVariables === 3 ? 'active-element' : null)}
                           htmlFor="flexRadioThreeVariables">
                        Drei Variablen
                    </label>
                </div>
            </div>
        </div>
    );
}