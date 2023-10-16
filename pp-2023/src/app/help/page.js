import "../globals.css";

export default function Help() {
  return (
    <div className="container mh-100 extra-containers">
      <h1>Help</h1>
      <h2 className="h5">Was ist der K/Means Algorithmus?</h2>
      <p>
        Der K-Means-Algorithmus ist eine Methode im Bereich des maschinellen
        Lernens und der Datenanalyse, die dazu dient, Datenpunkte in Gruppen
        oder Cluster zu organisieren. Der K-Means-Algorithmus teilt Datenpunkte
        in K Gruppen (Cluster) auf. Zunächst werden zufällige Cluster-Zentren
        festgelegt. Dann werden Datenpunkte den nächstgelegenen Zentren
        zugeordnet, und die Zentren werden neu berechnet. Dieser Prozess wird
        wiederholt, bis die Zuordnungen stabil sind. Das Ergebnis sind K
        Cluster, die ähnliche Datenpunkte zusammenfassen.
      </p>
      <h2 className="h5">Was ist das Elbow-Kriterium?</h2>
      <p>
        Das Elbow-Kriterium ist ein einfaches Verfahren zur Auswahl der
        optimalen Anzahl von Clustern (K) im K-Means-Algorithmus. Das
        Elbow-Kriterium hilft dabei, die optimale Anzahl von Clustern im
        K-Means-Algorithmus zu finden, indem es nach dem Punkt sucht, an dem die
        Cluster-Variabilität aufhört, sich wesentlich zu verbessern, und wie ein
        Ellenbogen in einem Diagramm aussieht. Dieser Punkt ist die empfohlene
        Anzahl von Clustern.
      </p>
      <h2 className="h5">Was machen die Anzahl der Variablen?</h2>
      <p>
        Die Variablen im K-Means-Algorithmus repräsentieren die Datenpunkte und
        Cluster-Zentren, und sie werden verwendet, um Berechnungen für die
        Clusterbildung durchzuführen.
      </p>
      <h2 className="h5">Was bewirkt die Anzahl der Cluster?</h2>
      <p>
        Cluster im K-Means-Algorithmus dienen dazu, ähnliche Datenpunkte zu
        gruppieren, Muster zu erkennen und Daten in sinnvolle Segmente zu
        unterteilen.
      </p>
      <h2 className="h5">Lokale Berechnung</h2>
      <p>
        Bei Auswahl der lokalen Berechnung wird der Datensatz lokal auf dem
        ausführenden Computer berechnet.
      </p>
      <h2 className="h5">Remote Berechnung</h2>
      <p>
        Bei Auswahl der remote Berechnung wird der Datensatz über das Internet
        auf einem entfernten Computer durchgeführt. Das spart Rechenleistung des
        eigenen Computers.
      </p>
      <h2 className="h5">Format für das Hochladen von Dateien</h2>
      <p>
        Es können jegliche .CSV und .XLSX-Dateien hochgeladen werden. Es müssen
        lediglich die Anzahl der Dimensionen pro Reihe innerhalb der Datei
        übereinstimmen. Eine Dimension ist eine alleinstehende Zahl.
      </p>
    </div>
  );
}
