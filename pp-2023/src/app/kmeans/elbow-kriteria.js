export const CalculateElbowKriteria = () => {

}

export const CreateElbowCriteriaElements = ({inputKForElbow, setInputKForElbow}) => {

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
                               aria-describedby="inputGroup-sizing-lg"/>
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
                        {inputKForElbow}
                    </div>
                </div>
            </div>
        </div>
    );
}