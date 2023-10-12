import XLSX from "xlsx";

// Diese Funktion implementiert die Logik zum parsen der Ergebnis Daten in ein Excel Sheet.
// Außerdem wird hier der Button zum Download implementiert

export const ExportExcelFile = ({result}) => {

    //let result = {result}; //test Daten

const handleOnButtonClick = () => {

    let k = result.options.k; // Abfrage wieviele Cluster das Ergebnis enthält
    let wb = XLSX.utils.book_new(); // hier wird ein Excel Workbook erzeugt
    
    //Die schleife schreibt den Inhalt aller Cluster auf jeweils eine Eigene Arbeitsmappe
    for (let i = 0; i < k; i++){
        let ws = XLSX.utils.aoa_to_sheet(result.groups[i].cluster);
        XLSX.utils.book_append_sheet(wb, ws, "Cluster "+ i);
    }

    XLSX.writeFile(wb, "ClusterizedData.xlsx"); // Schreibt alle Worksheets die im "wb" gespeichert sind in ein File und löst den Download aus.
    
}


    return(
        <button
            type="button"
            className='compute-btn button'
             onClick={handleOnButtonClick}>
                Export Result
                </button>
    )
}