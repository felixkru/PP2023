import * as XLSX from "xlsx";

export const returnExcel = () => {
    const fileInput = document.getElementById('excelFileInput');
    const file = fileInput.files[0];
    return (file);
}

export const calculateExcel = async () => {
    const file = returnExcel();
    console.log(file)
    if (file) {
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
        return data;

    } else {
        alert('Bitte wähle eine Excel-Datei aus.');
        return null; // Fehlerfall: null zurückgeben
    }
}