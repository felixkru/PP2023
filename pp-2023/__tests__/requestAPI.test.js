import {
    validateLengthOfData, apiPostRequest, apiGetStateOfTask,
    apiGetResult, handleApiCommunication, runWithTimeout, createFormData
} from '../src/app/kmeans/requestAPI';

describe('Test der API-Calls', () => {
    /*
    Der Test prüft, ob die Datenlängen korrekt ausgelesen werden und mit den KPoints verglichen werden.
     */
    it('Valieren, ob es mehr Daten- als K-Punkte gibt:', () => {

        const kPoints = 5;
        const inputData = [
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
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
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
            [5, 2],
        ];

        const result = validateLengthOfData(inputData, kPoints);

        expect(global.alert).toHaveBeenCalledWith("Sie haben mehr Cluster, als Datenpunkte bereitgestellt. Eine Berechnung ist mit diesen Parametern nicht möglich.")
        expect(result).toBe(false);

        global.alert.mockClear();
    });
});
/*
Der Test prüft, ob ein korrektes FormData generiert wird.
Im zweiten Test soll ein Error geschmissen werden, da diese Funktionalität im
File Reader geprüft wird.
 */
describe('Testet die formData Erstellung', () => {
    it('Es soll ein Form data Objekt generiert werden.', async () => {
        const kPoints = 3;
        const data = [
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
        ]
        const result = await createFormData(kPoints, data);

    expect(result.get('file').name).toBe("dataPoints.json");
    });
})

describe('Testet den API-POST-REQUEST', () => {
    it('Es soll eine Task zurückgegeben werden.',async () => {
        const kPoints = 3;
        const data = [
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
        ]

        global.fetch = jest.fn();
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });

        const response = await apiPostRequest(kPoints, data);
        expect(response).toEqual({success: true});
        expect(fetch).toHaveBeenCalledWith(expect.any(String), {
            mode: 'cors',
            method: 'POST',
            body: expect.any(FormData),
            headers: {
                'Accept': 'application/json',
            },
        });
        global.fetch.mockClear();
    });

    it('Returnt einen Error',async () => {
        const kPoints = 12;
        const data = [
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
            [5,2,3],
        ]

        global.fetch = jest.fn();
        global.alert = jest.fn();
        fetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ success: true }),
        });

        try {
            await apiPostRequest(kPoints, data);
        } catch (err) {
            expect(err.status).toBe(!200);
            expect(global.alert).toHaveBeenCalledWith("Ihre Datei konnte von der API nicht verarbeitet werden. Versuchen" +
            "Sie es lokal.")
        }
        global.alert.mockClear();
        global.fetch.mockClear();
    });
})

describe('Testen der GetResult-Anfrage ', () => {

})
