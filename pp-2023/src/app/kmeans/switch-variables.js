import {useState} from "react";
import '../globals.css'

export function HandeleSwitchVariables() {
    const [numberOfVariables, setNumberOfVariables] = useState(2);

    const onOptionChange = (event) => {
        setNumberOfVariables(event.target.value)
    };

    return {
        numberOfVariables,
        onOptionChange,
    };
}

export function SwitchVariables() {

    let {numberOfVariables, onOptionChange} = HandeleSwitchVariables();
    numberOfVariables = parseInt(numberOfVariables);

    return (
        <div className='number-of-variables-container text-start'>
            <p>Anzahl der Variablen</p>
            <div className='variable-card card-style'>
                <div className="form-check">

                    <input className="variable-radio-input" type="radio" name="flexRadioDefault"
                           id="flexRadioTwoVariables" value={2} checked={numberOfVariables === 2}
                           onChange={onOptionChange}/>
                    <label className={'form-check-label ' + (numberOfVariables === 2 ? 'active-element' : null)}
                           htmlFor="flexRadioTwoVariables">
                        Zwei Variablen
                    </label>
                </div>
                <div className="form-check">
                    <input className="variable-radio-input" type="radio" name="flexRadioDefault"
                           id="flexRadioThreeVariables" value={3} checked={numberOfVariables === 3}
                           onChange={onOptionChange}/>
                    <label className={'form-check-label ' + (numberOfVariables === 3 ? 'active-element' : null)}
                           htmlFor="flexRadioThreeVariables">
                        Drei Variablen
                    </label>
                </div>
            </div>
        </div>
    );
}