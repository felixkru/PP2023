import * as XLSX from "xlsx";

function readExcelFile(file) {

    // führt nur aus, wenn eine Datei vorhanden ist sonst Fehlermeldung
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // hier wird das zweidimensionale Array gebaut
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Annahme: Erste Arbeitsblatt verwenden

            if (sheetName) {
                const worksheet = workbook.Sheets[sheetName];
                // console.log(workbook)
                const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // 'dataArray' enthält zweidimensionales Array
                console.log(dataArray);
                resolve(dataArray);

            } else {
                console.error('Arbeitsblatt nicht gefunden');
            }
        };

        reader.readAsBinaryString(file);
    } else {
        console.error('Bitte wählen Sie eine Excel-Datei aus.');
    }

}

export default readExcelFile;