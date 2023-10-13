import * as XLSX from "xlsx";

function isCSVFile(file) {
    const fileName = file.name;
    return fileName.toLowerCase().endsWith('.csv');
}

function isXLSXFile(file) {
    const fileName = file.name;
    return fileName.toLowerCase().endsWith('.xlsx');
}

export const returnExcel = () => {
    const fileInput = document.getElementById('excelFileInput');
    const file = fileInput.files[0];
    return (file);
}

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

                    if (row.includes(";")) {
                        const columns = row.replace('\r', '').split(';');
                        csvData.push(columns);
                    }
                    else {
                        const columns = row.replace('\r', '').split(',');
                        csvData.push(columns);
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