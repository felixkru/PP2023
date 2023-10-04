import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelFileUploader = () => {
    const [excelData, setExcelData] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleCalculate = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setExcelData(excelData);
                console.log(excelData);
                // Hier kannst du deine Berechnungen mit den Daten durchführen
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <div className='file-input'>
                <input
                    className="card-style form-control form-control-lg"
                    type="file"
                    id="formFile"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                />
            </div>
            <button onClick={handleCalculate}>Berechnen</button>
        </div>
    );
};

export default ExcelFileUploader;