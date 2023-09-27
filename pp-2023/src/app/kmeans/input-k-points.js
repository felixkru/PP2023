'use client'
import {useState, createContext, useContext} from "react";

const InputKPointsContext = createContext();

export function InputKPointsProvider ({children}) {
    const [numberOfClusters, setNumberOfClusters] = useState(3);

    const updateKValue = (newValue) => {
        setNumberOfClusters(parseInt(newValue));
        console.log(newValue);
    }

    return (
        <InputKPointsContext.Provider value={{numberOfClusters, updateKValue}}>
            {children}
        </InputKPointsContext.Provider>
    );
}

export const UseInputKPoints = () => {
    return useContext(InputKPointsContext);
}

export function InputKPoints () {

    const {numberOfClusters, updateKValue} = UseInputKPoints();

    return (
        <section className='slider-container mb-5'>
            <div className='slider text-start'>
                <label htmlFor="numberClustersSlider"
                       className="form-label">K = {numberOfClusters}
                    <span className='hint'>(Anzahl der Cluster)</span>
                </label>
                <input type="range"
                       className="form-range"
                       min="1"
                       max="100"
                       id="numberClustersSlider"
                       value={numberOfClusters}
                       onChange={(event) => updateKValue(event.target.value)}
                />
            </div>
        </section>
    );
}