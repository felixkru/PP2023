import { act, render, renderHook, screen } from '@testing-library/react';
import { InputKPoints, InputKPointsProvider, UseInputKPoints } from '../src/app/kmeans/input-k-points';

describe('InputKPoints Component', () => {
    it('should render component', () => {
        render(
            <InputKPointsProvider>
                <InputKPoints />
            </InputKPointsProvider>
        );

        // Überprüfen, ob die Komponente (hier das Span-Element) gerendert wird
        const slider = screen.getByText("(Anzahl der Cluster)");
        expect(slider).toBeInTheDocument();
    });
});

describe('InputKPoints Context', () => {
    it('should provide context values', () => {
        const { result } = renderHook(() => UseInputKPoints(), { wrapper: InputKPointsProvider });

        // Überprüfen, ob die State-Variable numberOfClusters verfügbar ist und initial auf 3 gesetzt wurde
        expect(result.current.numberOfClusters).toEqual(3);
    });

    it('should change context value if slider is used', () => {
        const { result } = renderHook(() => UseInputKPoints(), { wrapper: InputKPointsProvider });

        // Betätigen des Sliders für die Anzahl der Cluster simulieren
        act(() => {
            result.current.updateKValue('10')
        });

        // Überprüfen, ob die State-Variable numberOfClusters aktualisiert wurde
        expect(result.current.numberOfClusters).toEqual(10);
    });
});