import {InputKPointsProvider} from '../src/app/kmeans/input-k-points';
import {HandleDynamicGeneratedInputFieldsProvider} from '../src/app/kmeans/create-save-manuel-input'
import {CalculateButton} from '../src/app/kmeans/calculateButton';
import {HandeleSwitchVariablesProvider} from '../src/app/kmeans/switch-variables';
import {screen, render, fireEvent} from "@testing-library/react";
import {HandleCalculateButtonClick} from '../src/app/kmeans/calculateButton';

describe('Calculation-Button', () => {

    it('should render the Calculation-Button.', () => {
        const mockCalculateButton = jest.fn();
        render(
            <HandeleSwitchVariablesProvider>
                <InputKPointsProvider>
                    <HandleDynamicGeneratedInputFieldsProvider>
                        <CalculateButton/>
                    </HandleDynamicGeneratedInputFieldsProvider>
                </InputKPointsProvider>
            </HandeleSwitchVariablesProvider>
        )

        const button = screen.getByTestId('calculateButtonTest');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(mockCalculateButton).toHaveBeenCalled()
    });

    it('Führt eine lokale Berechnung durch mit manuellen Input.', () => {
        const localRemoteButton = true;
        const setLocalRemoteButton = jest.fn();
        const {handleClick} = HandleCalculateButtonClick(localRemoteButton);

        const apiPostRequest = jest.fn();
        const handleApiCommunication = jest.fn();
        const ScatterChart = jest.fn();
        const setResultExport = jest.fn();

        expect(setLocalRemoteButton).toHaveBeenCalledWith(true); // Überprüfen Sie die Parameter
        expect(apiPostRequest).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(Number), expect.any(Boolean));
        expect(handleApiCommunication).toHaveBeenCalledWith(expect.any(Object), expect.any(Number));
        expect(ScatterChart).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), expect.any(Object), expect.any(String), expect.any(String));
        expect(setResultExport).toHaveBeenCalledWith(expect.any(Object));
    });
})