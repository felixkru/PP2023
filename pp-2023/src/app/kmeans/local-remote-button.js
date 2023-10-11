/*
Die Funktion bekommt zwei Probs. Hierbei wird ein Toggle-Switch gerendert. Bei einem Click auf den Switch,
wird der Wert von false auf true geändert. Bei einem erneuten Click von true auf false.
 */
export const CreateLocalRemoteButton = ({ localRemoteButton, setLocalRemoteButton }) => {
    const toggleLocalRemoteButton = () => {
        setLocalRemoteButton(!localRemoteButton);
    };

    return (
        <div className="d-flex align-items-center form-check form-switch position-relative w-100 mt-5">
            <label className="form-check-label form-check-label-individual form-check-label-individual-left" htmlFor="toggleSwitch">Lokal</label>
            <input className="form-check-input form-check-input-toggle-individual" type="checkbox" id="toggleSwitch" role="checkbox"
            onChange={toggleLocalRemoteButton} checked={localRemoteButton}
            />
            <label className="form-check-label form-check-label form-check-label-individual form-check-label-individual-right" htmlFor="toggleSwitch">Remote</label>
        </div>
    )
}

