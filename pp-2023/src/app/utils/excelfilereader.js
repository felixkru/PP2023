import * as XLSX from "xlsx";

// überprüft, ob es sich um eine csv Datei handelt
function isCSVFile(file) {
    const fileName = file.name;
    return fileName.toLowerCase().endsWith('.csv');
}

// überprüft, ob es sich um eine xlsx Datei handelt
function isXLSXFile(file) {
    const fileName = file.name;
    return fileName.toLowerCase().endsWith('.xlsx');
}

// überprüft, ob das richtige Dateiformat übergeben wurde
export function checkFileFormat(event) {
    const file = event.target.files[0];
    const fileInput = document.getElementById('excelFileInput');

    if (file) {
        if (!(isXLSXFile(file) || isCSVFile(file))) {
            // Datei ist im falschen Format, geben Sie einen Alert aus.
            alert("Die ausgewählte Datei hat ein ungültiges Format. Bitte wählen Sie eine xlsx- oder csv-Datei aus.");
            fileInput.value = "";
        }
    }
}

// gibt die ganze Excel zurück
export const returnExcel = () => {
    const fileInput = document.getElementById('excelFileInput');

    if (fileInput) {
        return fileInput.files[0];
    } else {
        return null;
    }
}

// gibt den Inhalt der Excel als zweidimensionales Array zurück
export const calculateExcel = async () => {
    const file = returnExcel();
    if (isXLSXFile(file)) {
        const reader = new FileReader();

        const data = await new Promise((resolve) => {
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const workbook = XLSX.read(arrayBuffer, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

                // Funktion zum Extrahieren von Zahlen aus den Zellen
                const extractNumbers = (value) => {
                    // Verwende parseFloat, um die Zeichenfolge in eine Zahl zu konvertieren
                    const number = parseFloat(value);
                    // Überprüfe, ob die Konvertierung erfolgreich war und die Zahl nicht NaN ist
                    return !isNaN(number) ? number : null;
                };

                // Iteriere durch die JSON-Daten und wende die Funktion auf jede Zelle an
                const numbersData = jsonData.map(row =>
                    row.map(cell => extractNumbers(cell))
                );

                // Filtere die Zahlen, um null-Werte zu entfernen
                const filteredNumbersData = numbersData.map(row =>
                    row.filter(cell => cell !== null && cell !== 0)
                );
                resolve(filteredNumbersData);
            };

            reader.onerror = () => {
                console.error('Fehler beim Lesen der Datei');
            };

            reader.readAsArrayBuffer(file);
        });
        return (data);
    } else if (isCSVFile(file)) {
        const reader = new FileReader();

        const data = await new Promise((resolve) => {
            reader.onload = () => {
                const text = reader.result;
                const rows = text.split('\n');
                const csvData = [];

                rows.forEach((row) => {
                    if (row.includes(";")) {
                        row = row.replace(/,/g, '.');
                    }
                    const numbersArray = row.match(/\d+\.?\d*/g);
                    if (numbersArray !== null) {
                        csvData.push(numbersArray.map(Number));
                    }
                });
                resolve(csvData);
            };
            reader.onerror = () => {
                console.error('Fehler beim Lesen der Datei');
            };
            reader.readAsText(file);
        });
        return (data);
    } else {
        alert('Bitte wähle eine .xlsx oder .csv Datei aus.');
        return null; // Fehlerfall: null zurückgeben
    }
}