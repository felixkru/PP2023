import * as XLSX from "xlsx";

export const ReturnExcel = () => {
    const fileInput = document.getElementById('ExcelFileInput');
    const file = fileInput.files[0];
    return (file);
}

export const CalculateExcel = (callback) => {
    const file = ReturnExcel();

    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            const arrayBuffer = reader.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // `data` enthält das zweidimensionale Array
            callback(data); // Hier rufen wir die Callback-Funktion auf
        };

        //reader.onerror = () => {
        //    console.error('Fehler beim Lesen der Datei');
        //    callback(null); // Fehlerfall: Callback mit null aufrufen
        // };
    } else {
        // console.error('Bitte wähle eine Excel-Datei aus.');
        callback(null); // Fehlerfall: Callback mit null aufrufen
    }
}