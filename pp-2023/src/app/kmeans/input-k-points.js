import {useState} from "react";

export function HandleInputKPoints () {

    const [numberOfClusters, setNumberOfClusters] = useState(3);

    const handleChange = (event) => {
        setNumberOfClusters(event.target.value);
    }

    return {
        numberOfClusters,
        handleChange,
    };
}
export function InputKPoints () {

    const {numberOfClusters, handleChange} = HandleInputKPoints();

    return (
        <section className='slider-container mb-5'>
            <div className='slider text-start'>
                <label htmlFor="numberClustersSlider" className="form-label">K = {numberOfClusters} <span className='hint'>(Anzahl der Cluster)</span></label>
                <input type="range" className="form-range" min="1" max="100" id="numberClustersSlider" value={numberOfClusters} onChange={handleChange} />
            </div>
        </section>
    );
}