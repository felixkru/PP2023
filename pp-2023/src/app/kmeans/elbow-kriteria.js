import {kMeansAlgorithm} from '../utils/kmeans';
import {APIError} from '../utils/userErrors';
import {useState} from "react";
export const CalculateElbowKriteria = () => {

}

export const CreateElbowCriteriaElements = ({inputKForElbow, setInputKForElbow, bestKForKMeans,
setBestKForKMeans}) => {

    const [userInput, setUserInput]  = useState(null)

    const handleInputButtonClick = () => {

    }

    /*
    Die Funktion validiert die User-Eingabe. Dabei wird geprüft, ob der Input eine
    Ganzzahl ist unf kleiner als 26.
     */
    const validateInputButtonClick = ((value) => {
        if (Number.isInteger(value)) {
            if (value <= 25) {
                setInputKForElbow(value);
            } else {
                setInputKForElbow('');
                APIError("Bitte geben Sie eine Zahl kleiner gleich 25 ein!");
            }
        } else {
            setInputKForElbow('');
            APIError("Bitte geben Sie eine Ganzzahl ein.");
        }
    });

    return (
        <div className="mt-5 mb-5 flex row-cols-2">
            <div>
                <div className="grid-cell-elbow">
                    <button className="btn btn-primary btn-lg btn-elbow" type="submit">Elbow-Kriteria</button>
                </div>
                <div className="grid-cell-elbow">
                    <div className="input-group input-group-lg">
                        <label className="input-group-text" id="label-input-k-elbow" htmlFor="input-k-elbow">Max K</label>
                        <input placeholder="max 25" max="25" step="1" id="input-l-elbow" type="number"
                               className="form-control input-k-elbow" aria-label="label-input-k-elbow"
                               aria-describedby="inputGroup-sizing-lg"
                               value={userInput}
                        />
                        </div>
                    </div>
                </div>
            <div>
                <div className="grid-cell-elbow">
                    <div className="hedaline-utput txt-output-elbow">
                        Ihr optimales K:
                    </div>
                </div>
                <div className="grid-cell-elbow mt-2">
                    <div className="output-text-k-area txt-output-elbow">

                    </div>
                </div>
            </div>
        </div>
    );
}