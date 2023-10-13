import { screen, render, renderHook, fireEvent } from '@testing-library/react';
import { CreateManuelInputFields, HandleDynamicGeneratedInputFields, HandleDynamicGeneratedInputFieldsProvider } from '../src/app/kmeans/create-save-manuel-input';

jest.mock('../src/app/kmeans/switch-variables', () => {
    return {
        HandleSwitchVariables: () => {
            return {
                numberOfVariables: 2, // Setzen Sie hier einen gültigen Wert für numberOfVariables
                onOptionChange: jest.fn(),
            };
        },
    };
});

describe('CreateManuelInputFields Component', () => {
    it('should render input section and add-button', () => {
        render(
            <HandleDynamicGeneratedInputFieldsProvider>
                <CreateManuelInputFields />
            </HandleDynamicGeneratedInputFieldsProvider>
        );

        const inputSection = screen.getByTestId("inputSection");
        const addBtn = screen.getByTestId("addBtn");

        expect(inputSection).toBeInTheDocument();
        expect(addBtn).toBeInTheDocument();
    });
    xit('handleInputChange aktualisiert inputDataArray korrekt', () => {
        const { container } = render(
            <HandleDynamicGeneratedInputFieldsProvider>
                <CreateManuelInputFields />
            </HandleDynamicGeneratedInputFieldsProvider>
        );
      
        const input = screen.getByTestId("inputVector0");
      
        // Simulieren Sie eine Benutzereingabe
        fireEvent.change(input, { target: { value: '42' } });
      
        const inputDataArray = container.querySelector('[data-testid="inputDataArray"]');
  
        // Extrahieren Sie den Wert des inputDataArray aus dem DOM-Element
        const inputDataArrayValue = JSON.parse(inputDataArray.getAttribute('data-value'));
        expect(inputDataArrayValue[0][0]).toBe(42);
    });
});

describe('HandleDynamicGeneratedInputFields Context', () => {
    it('should provide context values', () => {
        const { result } = renderHook(() => HandleDynamicGeneratedInputFields(), { wrapper:  HandleDynamicGeneratedInputFieldsProvider});

        expect(result.current.counterCountAdd).toEqual(2);
        expect(result.current.inputDataArray).toBeInstanceOf(Array);
    });
});