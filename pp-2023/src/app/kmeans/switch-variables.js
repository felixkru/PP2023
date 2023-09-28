'use client'
import {useState, createContext, useContext, useEffect} from "react";

/*
    Damit die State-Hooks in anderen Komponenten mit dem aktuellen Status verwendet werden können, wird der Kontext-Hook
    verwendet.
*/
const HandleSwitchVariablesContext = createContext();

export function HandeleSwitchVariablesProvider({children}) {

    const [numberOfVariables, setNumberOfVariables] = useState(2);
    const [activePoint1, setActivePoint1] = useState(true);
    const [activePoint2, setActivePoint2] = useState(false);

    /*
    Mit UseEffect erfolgt ein direkter DOM-Zugriff. Dabei wird Use-Effect verwendet, um
    Konflikte zwischen globalen Variablen zu vermeiden.
     */
    useEffect(() => {
        const inputs = document.querySelectorAll('.input-vektor-get');
        const variablesArea = document.querySelectorAll('.form-check-input-radio');
        const addButton = document.querySelectorAll('.plus-button');
        inputs.forEach((input) => {
            input.addEventListener('change', () => {
                disableButtonChangeVariables(variablesArea);
            });
        });
        addButton.forEach((addButton) => {
            addButton.addEventListener('click', () => {
                disableButtonChangeVariables(variablesArea);
            });
        });

    }, []);


    /*
    Die Funktion setzt bei allen Button das Attribut disable.
     */
    const disableButtonChangeVariables = (variablesArea) => {
        variablesArea.forEach((variablesArea) => {
            variablesArea.setAttribute('disable', 'true');
            variablesArea.classList.add('form-check-input');
        });
    }

    /*
    onOptionChange setzt den Wert von numberOfVariables neu.
     */
    const onOptionChange = (newValue) => {
        setNumberOfVariables(parseInt(newValue));
        setActivePoint1((value) => !value);
        setActivePoint2((value) => !value);
    };

    return (
        <HandleSwitchVariablesContext.Provider value={{numberOfVariables, onOptionChange, activePoint1, activePoint2}}>
            {children}
        </HandleSwitchVariablesContext.Provider>
    );
}

/*
    HandleSwitchVariables gibt den Status numberOfVariables, sowie die Methode onOptionChange global frei.
 */
export const HandleSwitchVariables = () => {
    return useContext(HandleSwitchVariablesContext);
}

export function SwitchVariables() {

    let {numberOfVariables, onOptionChange, activePoint1, activePoint2} = HandleSwitchVariables();

    return (
        <div className='number-of-variables-container text-start'>
            <p>Anzahl der Variablen</p>
            <div className='variable-card card-style'>
                <div className="form-check">
                    <input className="form-check-input-radio" type="radio" name="flexRadioDefaultTwoVariables"
                           id="flexRadioDefaultTwoVariables" value={2} checked={activePoint1}
                           onChange={event => onOptionChange(event.target.value)}
                    />
                    <label className="form-check-label"
                           htmlFor="flexRadioDefaultTwoVariables">
                        Zwei Variablen
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input-radio" type="radio" name="flexRadioDefaultThreeVariables"
                           id="flexRadioDefaultThreeVariables" value={3} checked={activePoint2}
                           onChange={event => onOptionChange(event.target.value)}
                    />
                    <label className="form-check-label"
                           htmlFor="flexRadioDefaultThreeVariables">
                        Drei Variablen
                    </label>
                </div>
            </div>
        </div>
    );
}