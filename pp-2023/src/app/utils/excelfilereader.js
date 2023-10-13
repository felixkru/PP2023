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
    const file = fileInput.files[0];
    return (file);
}

// gibt den Inhalt der Excel als zweidimensionales Array zurück
export const calculateExcel = async () => {
    const file = returnExcel();
    console.log(file)
    if (isXLSXFile(file)){
        const reader = new FileReader();

        const data = await new Promise((resolve) => {
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                resolve(jsonData);
            };

            reader.onerror = () => {
                console.error('Fehler beim Lesen der Datei');
            };

            reader.readAsArrayBuffer(file);
        });
        return (data);
    }
    else if (isCSVFile(file)){
        const reader = new FileReader();

        const data = await new Promise((resolve) => {
            reader.onload = () => {
                const text = reader.result;
                const rows = text.split('\n');
                const csvData = [];

                rows.forEach((row) => {

                    // Dieser Abschnitt ist temporär und säubert die Eingaben bei CSV-Dateien. Später soll das ganze per RegEx geschehen
                    if (row.includes(";")) {
                        const columns = row.replace('\r', '').split(';');
                        let filteredColumn = columns.filter(element => element !== "").map(str => parseFloat(str.replace(',', '.')));
                        if (filteredColumn.length === 0) {
                            // Array löschen
                            filteredColumn = null; // Oder myArray = [] für ein leeres Array
                        }
                        else {
                            csvData.push(filteredColumn);
                        }
                    }
                    else {
                        const columns = row.replace('\r', '').split(',');
                        let filteredColumn = columns.filter(element => element !== "").map(str => parseFloat(str.replace(',', '.')));
                        if (filteredColumn.length === 0) {
                            // Array löschen
                            filteredColumn = null; // Oder myArray = [] für ein leeres Array
                        }
                        else {
                            csvData.push(filteredColumn);
                        }
                    }
                });

                console.log(csvData);
                resolve(csvData);
            };

            reader.onerror = () => {
                console.error('Fehler beim Lesen der Datei');
            };

            reader.readAsText(file);
        });

        return (data);
    }
    else {
        alert('Bitte wähle eine .xlsx oder .csv Datei aus.');
        return null; // Fehlerfall: null zurückgeben
    }
}