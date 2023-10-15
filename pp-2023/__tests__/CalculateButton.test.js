import {InputKPointsProvider} from '../src/app/kmeans/input-k-points';
import {HandleDynamicGeneratedInputFieldsProvider} from '../src/app/kmeans/create-save-manuel-input'
import {CalculateButton} from '../src/app/kmeans/calculateButton';
import {HandeleSwitchVariablesProvider} from '../src/app/kmeans/switch-variables';
import {screen, render, fireEvent} from "@testing-library/react";

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

})