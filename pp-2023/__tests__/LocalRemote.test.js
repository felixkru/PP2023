import { CreateLocalRemoteButton } from '../src/app/kmeans/local-remote-button';
import { screen, render, fireEvent } from '@testing-library/react';

const mockSetLocalRemoteButton = jest.fn();

describe('LocalRemoteButton', () => {
    it('should render toggle switch button and labels', () => {
        render(<CreateLocalRemoteButton />);

        const toggleSwitch = screen.getByTestId("localRemoteBtnTest");
        const localLabel = screen.getByLabelText("Lokal");
        const remoteLabel = screen.getByLabelText("Remote");

        expect(toggleSwitch).toBeInTheDocument();
        expect(localLabel).toBeInTheDocument();
        expect(remoteLabel).toBeInTheDocument();
    });

    it('should switch between local and remote correctly', () => {
        render(<CreateLocalRemoteButton localRemoteButton={false} setLocalRemoteButton={mockSetLocalRemoteButton} />);
        

        const toggleSwitch = screen.getByTestId("localRemoteBtnTest");
        expect(toggleSwitch).not.toBeChecked();

        fireEvent.click(toggleSwitch);
        expect(mockSetLocalRemoteButton).toHaveBeenCalledWith(true);
    });
});