import XLSX from "xlsx";

// Diese Funktion implementiert die Logik zum parsen der Ergebnis Daten in ein Excel Sheet.
// Außerdem wird hier der Button zum Download implementiert

export const ExportExcelFile = ({result}) => {

    //let result = {result}; //test Daten

const handleOnButtonClick = () => {
    console.log(result); // Zum test ob die richtigen Daten ankommen
    console.log(typeof result);
    // var wb = XLSX.utils.book_new(), 
    // ws = XLSX.utils.aoa_to_sheet(result);
    // XLSX.utils.book_append_sheet(wb, ws, "Mappe1"); // Name des Sheets

    // XLSX.writeFile(wb, "ClusterizedData.xlsx"); // Name der Datei
    
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