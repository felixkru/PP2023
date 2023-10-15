import {
    validateLengthOfData, apiPostRequest, apiGetStateOfTask,
    apiGetResult, handleApiCommunication, runWithTimeout, createFormData
} from '../src/app/kmeans/requestAPI';
import * as url from "url";

describe('Test der API-Calls', () => {
    /*
    Der Test prüft, ob die Datenlängen korrekt ausgelesen werden und mit den KPoints verglichen werden.
     */
    it('Validieren, ob es mehr Daten- als K-Punkte gibt:', () => {

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
    it('Validieren, ob es mehr Daten- als K-Punkte gibt:', () => {

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
        const url = "https://test.com";
        const KPoints = 3;
        const dataArrayForWorking = [
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

        const response = await apiPostRequest(url, KPoints, dataArrayForWorking);
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
        const url = "https://test.com";
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
            await apiPostRequest(url, kPoints, data);
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
    it('sollte den Status einer Aufgabe abrufen und verarbeiten', async () => {
        // Mocken global.fetch für den Test
        global.fetch = jest.fn();

        // Mocken der fetch-Aufrufe und Rückgabe einer Mock-Antwort.
        // Dabei wird erst ein Fetch mit processing aufgerufen, um den Timeout zu testen.
        fetch.mockResolvedValueOnce({
            status: 200,
            json: () => Promise.resolve({ status: 'processing' }),
        });
        fetch.mockResolvedValueOnce({
            status: 200,
            json: () => Promise.resolve({ status: 'completed' }),
        });

        const taskId = 'task_ID';
        const maxVersuch = 5;

        const result = await apiGetStateOfTask(taskId, maxVersuch);

        expect(fetch).toHaveBeenCalledWith(`https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/kmeans/status/${taskId}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        // Überprüfen, ob die Funktion das erwartete Ergebnis zurückgibt
        expect(result).toBe(1);

        global.fetch.mockClear();
    });
})

/*
Der Test erstellt einmal einen Promise und prüft diesen im 1. Test auf einen erfolgreichen Return, im zweiten Test
wird der Timeout überschritten und ein Error wird rejected.
 */
describe('Test für den Timeout', () => {
    it('sollte das Versprechen auflösen, wenn das Versprechen vor dem Timeout aufgelöst wird', async () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('LetseeeeeGOOOOO'), 100); // Versprechen wird vor dem Timeout aufgelöst
        });
        const result = await runWithTimeout(promise, 200);
        expect(result).toBe('LetseeeeeGOOOOO');
    });

    it('sollte einen Timeout-Fehler werfen, wenn das Versprechen nicht rechtzeitig aufgelöst wird', async () => {
        const promise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 200); // Versprechen wird nicht rechtzeitig aufgelöst
        });
        await expect(runWithTimeout(promise, 100)).rejects.toThrowError('Timeout');
    });
})

describe('Testet das Ergebnis der an die Api gesendeten Aufgabe.', () => {
    it('Liefert ein konkretes Ergebnis zurück',async () => {
        global.fetch = jest.fn();

        const taskId = 'taskId';

        fetch.mockResolvedValueOnce({
            status: 200,
            json: () => Promise.resolve({ result: "Ergebnis"}),
        });

        const result = await apiGetResult(taskId);

        expect(result.result).toEqual("Ergebnis");
        global.fetch.mockClear();
    });

    /*
    Es wird ein Fehler geworfen und ein Alert aufgerufen, der dem Nutzer diesen Fehler beschreibt.
     */
    it('sollte einen Fehler werfen, wenn die Anfrage nicht erfolgreich ist', async () => {
        global.fetch = jest.fn();
        global.alert = jest.fn()
        fetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ detail: 'Fehlermeldung' }),
            status: 400,
        });

        const taskId = 'task_ID';

        await apiGetResult(taskId)

        expect(alert).toHaveBeenCalledWith("Fehlermeldung");

        global.fetch.mockClear();
        global.alert.mockClear();
    });
})
