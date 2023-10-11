import {validateLengthOfData, apiPostRequest, apiGetStateOfTask,
    apiGetResult, handleApiCommunication, runWithTimeout} from '../src/app/kmeans/requestAPI';

describe('Test der API-Calls', () => {
    /*
    Der Test prüft, ob die Datenlängen korrekt ausgelesen werden und mit den KPoints verglichen werden.
     */
    it('Valieren, ob es mehr Daten- als K-Punkte gibt:', () => {

        const kPoints = 5;
        const inputData = [
            [5,2],
            [5,2],
            [5,2],
            [5,2],
            [5,2],
            [5,2],
        ];

        const result = validateLengthOfData(inputData, kPoints)
        expect(result).toBe(true);
    });

    /*
    Der Test prüft, ob false zurückgegeben wird und ein alert aufgerufen wird.
     */
    it('Valieren, ob es mehr Daten- als K-Punkte gibt:', () => {

        global.alert = jest.fn();
        const kPoints = 17;
        const inputData = [
            [5,2],
            [5,2],
            [5,2],
            [5,2],
            [5,2],
            [5,2],
        ];

        const result = validateLengthOfData(inputData, kPoints);

        expect(global.alert).toHaveBeenCalledWith("Sie haben mehr Cluster, als Datenpunkte bereitgestellt. Eine Berechnung ist mit diesen Parametern nicht möglich.")
        expect(result).toBe(false);

        global.alert.mockClear();
    });

    /*
    Der Test prüft, ob die Funktion apiPostRequest ein Task erfolgreich zurückgibt.
    Weiter wird getestet, ob ein korrektes JSON-File übergeben wird.
    Das Auslesen einer Excel-Datei wird im Excel-Reader getestet.
     */
    it('Testet den POST-Request:', () => {
        jest.mock('')
    });
})