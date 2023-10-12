import React from 'react';
import { render, renderHook, fireEvent, screen, act } from '@testing-library/react';
import { SwitchVariables, HandeleSwitchVariablesProvider, HandleSwitchVariables } from '../src/app/kmeans/switch-variables'; 

describe('SwitchVariables Component', () => {
    it('should render component', () => {
        render(
        <HandeleSwitchVariablesProvider>
            <SwitchVariables />
        </HandeleSwitchVariablesProvider>
        )

        // Container und Label überprüfen
        const switchVariablesContainer = screen.getByText("Anzahl der Variablen");
        expect(switchVariablesContainer).toBeInTheDocument();

        // Überprüfen, ob die Radio-Buttons gerendert werden
        const twoVariablesRadio = screen.getByLabelText("Zwei Variablen");
        const threeVariablesRadio = screen.getByLabelText("Drei Variablen");
        expect(twoVariablesRadio).toBeInTheDocument();
        expect(threeVariablesRadio).toBeInTheDocument();
    })

    it('should react to click on radio buttons', () => {
        render(
          <HandeleSwitchVariablesProvider>
            <SwitchVariables />
          </HandeleSwitchVariablesProvider>
        );
    
        const twoVariablesRadio = screen.getByLabelText('Zwei Variablen');
        const threeVariablesRadio = screen.getByLabelText('Drei Variablen');
        expect(twoVariablesRadio).toBeChecked();
        expect(threeVariablesRadio).not.toBeChecked();
    
        fireEvent.click(threeVariablesRadio);
    
        expect(twoVariablesRadio).not.toBeChecked();
        expect(threeVariablesRadio).toBeChecked();
      });
});

describe('HandleSwitchVariables Context', () => {
    it('should provide context values', () => {
      const { result } = renderHook(() => HandleSwitchVariables(), { wrapper: HandeleSwitchVariablesProvider });
  
      expect(result.current.numberOfVariables).toEqual(2);
      expect(result.current.activePoint1).toEqual(true);
      expect(result.current.activePoint2).toEqual(false);
    });
  
    it('should change context values when a radio button is selected', () => {
      const { result } = renderHook(() => HandleSwitchVariables(), { wrapper: HandeleSwitchVariablesProvider });
  
      /* onOptionChange triggern und überprüfen, ob die State Variablen aktualisiert entsprechend (onOptionChange setzt den Wert von numberOfVariables neu */
      act(() => {
        result.current.onOptionChange('3');
      });
  
      expect(result.current.numberOfVariables).toEqual(3);
      expect(result.current.activePoint1).toEqual(false);
      expect(result.current.activePoint2).toEqual(true);

      act(() => {
        result.current.onOptionChange('2');
      });
  
      expect(result.current.numberOfVariables).toEqual(2);
      expect(result.current.activePoint1).toEqual(true);
      expect(result.current.activePoint2).toEqual(false);
    });
});