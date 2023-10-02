// Importiere React und die useState-Hook-Funktion aus dem 'react'-Modul
// sowie die XLSX-Bibliothek für die Verarbeitung von Excel-Dateien.
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// Definiere die React-Komponente 'ExcelFileReader'.
function ExcelFileReader() {
    // Verwende den 'useState'-Hook, um den Zustand für die Excel-Daten zu initialisieren.
    // 'excelData' wird verwendet, um die Daten aus der Excel-Datei zu speichern.
    // 'setExcelData' ist eine Funktion, mit der der Zustand aktualisiert wird.
    const [excelData, setExcelData] = useState(null);

    // Diese Funktion wird aufgerufen, wenn der Benutzer eine Datei auswählt.
    const handleFileUpload = async (e) => {
        // 'e.target.files[0]' gibt die ausgewählte Datei zurück.
        const file = e.target.files[0];
        if (file) {
            // Erstelle einen FileReader, um die Datei zu lesen.
            const reader = new FileReader();

            // Definiere eine Funktion, die aufgerufen wird, wenn die Datei erfolgreich gelesen wurde.
            reader.onload = async (e) => {
                // Konvertiere die gelesenen Daten in ein Uint8Array.
                const data = new Uint8Array(e.target.result);

                // Verwende die 'XLSX.read'-Funktion aus der XLSX-Bibliothek,
                // um das Excel-Workbook aus den Daten zu erstellen.
                const workbook = XLSX.read(data, { type: 'array' });

                // Gehe davon aus, dass die erste Tabelle im Workbook gelesen wird.
                const sheetName = workbook.SheetNames[0];

                // Rufe das Arbeitsblatt (Worksheet) mit dem gegebenen Namen ab.
                const worksheet = workbook.Sheets[sheetName];

                // Verwende 'XLSX.utils.sheet_to_json', um das Arbeitsblatt in ein JSON-Objekt zu konvertieren.
                // Das 'header: 1'-Option bedeutet, dass die erste Zeile als Kopfzeile verwendet wird.
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Aktualisiere den Zustand 'excelData' mit den gelesenen Daten.
                setExcelData(jsonData);

                // Gib den Inhalt des Arrays in der Konsole aus.
                console.log(jsonData);
            };

            // Starte den Lesevorgang der Datei als ArrayBuffer.
            reader.readAsArrayBuffer(file);
        }
    };

    // Die 'ExcelFileReader'-Komponente gibt ein Eingabefeld für die Dateiauswahl zurück.
    return (
        <div className='file-input'>
            <input
                className="card-style form-control form-control-lg"
                type="file"
                id="formFile"
                onChange={handleFileUpload} // Füge den 'onChange'-Handler hinzu, um die Dateiauswahl zu verarbeiten.
            />
        </div>
    );
}

// Exportiere die 'ExcelFileReader'-Komponente, damit sie in anderen Modulen verwendet werden kann.
export default ExcelFileReader;