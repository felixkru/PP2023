import XLSX from 'xlsx';

// Diese Funktion implementiert die Logik zum parsen der Ergebnis Daten in ein Excel Sheet.
// Außerdem wird hier der Button zum Download implementiert

export const ExportExcelFile = ({result}) => {

    const handleOnButtonClick = () => {
        // Prüft ob überhaupt Daten vorhanden sind
        if (result.length !== 0) {

            //Abfrage ob ein Ergebnis aus lokaler Berechnung vorliegt
            if (result.groups) {
                let amountOfClusters = result.options.k; // Abfrage wieviele Cluster das Ergebnis enthält
                let wb = XLSX.utils.book_new(); // hier wird ein Excel Workbook erzeugt

                //Die schleife schreibt den Inhalt aller Cluster auf jeweils eine Eigene Arbeitsmappe
                for (let i = 0; i < amountOfClusters; i++) {
                    let ws = XLSX.utils.aoa_to_sheet(result.groups[i].cluster);
                    XLSX.utils.book_append_sheet(wb, ws, "Cluster " + (i + 1));
                }

                XLSX.writeFile(wb, "ClusterizedData.xlsx"); // Schreibt alle Worksheets die im "wb" gespeichert sind in ein File und löst den Download aus.
            }
            //Abfrage ob ein Ergebnis der Backend API vorliegt
            else if (result.Cluster[0].data_points) {
                console.log(result.Cluster.length);
                let amountOfClusters = result.Cluster.length; // Abfrage wieviele Cluster das Ergebnis enthält
                let wb = XLSX.utils.book_new(); // hier wird ein Excel Workbook erzeugt

                for (let i = 0; i < amountOfClusters; i++) {
                    console.log(result.Cluster[i].data_points);
                    let ws = XLSX.utils.aoa_to_sheet(result.Cluster[i].data_points);
                    XLSX.utils.book_append_sheet(wb, ws, "Cluster " + (i + 1));
                }
                XLSX.writeFile(wb, "ClusterizedData.xlsx");
            }
        }
        //Alert falls keine Daten aus der Berechnung vorliegen
        else {
            alert("Daten können erst nach der Berechnung ausgegeben werden.");
        }

    }

    return (
        <button
            type="button"
            className='compute-btn button btn-excel'
            onClick={handleOnButtonClick}>
            Export Result
        </button>
    )
}