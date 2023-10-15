"use client";
import { UseInputKPoints } from "./input-k-points";
import { kMeansAlgorithm } from "../utils/kmeans";
import { HandleDynamicGeneratedInputFields } from "./create-save-manuel-input";
import {
  apiPostRequest,
  handleApiCommunication,
  runWithTimeout,
  validateLengthOfData,
} from "./requestAPI";
import ScatterChart from "./scatter-chart";
import { returnExcel, calculateExcel } from "../utils/excelfilereader";
import { APIError } from "../utils/userErrors";
import { ExportExcelFile } from "../kmeans/exportButton";
import { useState } from "react";
import { useLoadingStatus } from "../common/LoadingScreen";
import { useDownloadContext } from "../context/downloadContext";
import * as url from "url";

export function HandleCalculateButtonClick(localRemoteButton) {
  const { chartReady } = useDownloadContext();
  const { startLoading, stopLoading } = useLoadingStatus();
  const { numberOfClusters } = UseInputKPoints();
  const { inputDataArray } = HandleDynamicGeneratedInputFields();
  const [resultExport, setResultExport] = useState([]);

  const noDataMessage =
    "Bitte geben Sie entweder manuell Ihre Datenpunkte ein" +
    " oder eine XLSX- CSV-Datei!";

  let chartDeletion = 0;

  /*
    Die Funktion handleClick steuert als Controller die Anwendungslogik, welche Daten verwendet werden und wo diese verarbeitet werden.
     */
  const handleClick = async () => {
    startLoading();
    const kMeansOrElbow = "kMeans";

    /*
        Initialisierung von Variablen für den Programmverlauf.
         */
    const kPoints = validateKPoints(numberOfClusters);
    const inputDataSrc = checkInputSource();
    const localCalculation = !localRemoteButton;
    const dataArrayForWorking = inputDataArray;
    chartDeletion = 1; //gibt an, dass das alte Chart von der ScatterChart funktion gelöscht werden muss

    if (inputDataSrc === "file") {
      /*
            Verarbeitung eines Files und Export an die KMeans-Api, anschließend wird das Ergebnis visualisiert.
             */
      if (!localCalculation) {
        try {
          const url =
            "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/kmeans/";
          const kForUrl = "k=" + kPoints;
          /*
                    Übersenden der eingegebenen Datei an das Backend.
                     */
          const resultPost = await apiPostRequest(url, kForUrl, kPoints, false);
          /*
                    Hier wird der Status der Task abgefragt. Aktuell wird ein Intervall von 3000 ms berücksichtigt.
                    Der Parameter maxVersuche, gibt dabei an, wie oft ein Request wiederholt werden soll, bis dieser abbricht.
                     */
          console.log(12);
          if (resultPost.TaskID) {
            const kMeansResult = await handleApiCommunication(resultPost, 10);
            console.log(kMeansResult);
            const localOrRemote = "remote"; // die Variable wird benötigt damit ScatterChart später weiß in welchem Format die Daten ankommen (local berechnet oder von der API)
            ScatterChart(
              kPoints,
              chartDeletion,
              kMeansResult,
              localOrRemote,
              kMeansOrElbow
            );
            setResultExport(kMeansResult);
            chartReady(true);
          }
          /*
                    In dem catch-Block werden allgemeine Fehler des Requests behandelt.
                    */
        } catch (error) {
          chartReady(false);
          throw new Error(error);
        } finally {
          stopLoading();
        }
        /*
                Auslesen eines Files und anschließende Verarbeitung im Client.
                */
      } else if (localCalculation) {
        /*
                Lokale Berechnung von KMeans mit der Visualisierung in Scatter-Chart.
                 */
        try {
          const inputData = await calculateExcel();
          /*
                    Hier werden, die eingegeben Daten auf eine ausreichende Anzahl an Cluster validiert.
                    */
          if (validateLengthOfData(inputData, kPoints) === false) {
            return;
          }
          // TODO Generierung Ladebildschirm
          const timeout = 30000;
          const result = await runWithTimeout(
            Promise.resolve(kMeansAlgorithm(inputData, kPoints)),
            timeout
          );
          const localOrRemote = "local";
          ScatterChart(
            kPoints,
            chartDeletion,
            result,
            localOrRemote,
            kMeansOrElbow
          );
          setResultExport(result);
          chartReady(true);
          // TODO response verarbeiten
        } catch (err) {
          chartReady(false);
          // hier wird ein Alert ausgegeben mit Instruktionen, dass Datensätze die gleiche Dimension haben müssen
          const toCheck =
            "Error: All the elements must have the same dimension";
          const pattern = new RegExp("\\b" + toCheck + "\\b", "i");
          const containsWord = pattern.test(err);

          if (containsWord) {
            alert(
              "Fehler: Bitte achten sie bei der Eingabedatei darauf, dass alle pro Reihe vorhandenen Zahlen in der Datei einem Datensatz zugeordnet werden.\n" +
                "Damit ein sinnvolles Ergebnis erzeugt werden kann, muss eine gleiche Menge an Dimensionen für jeden Datensatz vorhanden sein"
            );
            const fileInput = document.getElementById("excelFileInput");
            fileInput.value = "";
          } else {
            throw new Error(err);
          }
        } finally {
          stopLoading();
        }
      }
      /*
            Verarbeitung von manuell eingegeben Daten lokal.
            */
    } else if (inputDataSrc === "manuel") {
      if (localCalculation) {
        /*
                    Hier werden, die eingegeben Daten auf eine ausreichende Anzahl an Cluster validiert.
                */
        const validateInputData = validateLengthOfData(inputDataArray, kPoints);
        if (validateInputData === false) {
          stopLoading();
          return;
        }

        const result = await kMeansAlgorithm(inputDataArray, kPoints);
        setResultExport(result);
        const localOrRemote = "local";
        ScatterChart(
          kPoints,
          chartDeletion,
          result,
          localOrRemote,
          kMeansOrElbow
        );
        chartReady(true);
        stopLoading();
        /*
               Verarbeitung von manuell eingegeben Daten mithilfe der API.
                */
      } else if (!localCalculation) {
        try {
          /*
                    Übersenden der eingegebenen Datei an das Backend.
                     */
          const url =
            "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/kmeans/";
          const kForUrl = "k=" + kPoints;
          const resultPost = await apiPostRequest(
            url,
            kForUrl,
            kPoints,
            dataArrayForWorking
          );
          /*
                    Hier wird der Status der Task abgefragt. Aktuell wird ein Intervall von 3000 ms berücksichtigt.
                    Der Parameter maxVersuche, gibt dabei an, wie oft ein Request wiederholt werden soll, bis dieser abbricht.
                     */
          if (resultPost.TaskID) {
            const kMeansResult = await handleApiCommunication(resultPost);
            setResultExport(kMeansResult);
            const localOrRemote = "remote";
            ScatterChart(kPoints, chartDeletion, kMeansResult, localOrRemote);
            chartReady(true);
            stopLoading();
            // TODO response verarbeiten
          }
          /*
                    In dem catch-Block werden allgemeine Fehler des Requests behandelt.
                    */
        } catch (error) {
          chartReady(false);
          throw new Error(error);
        } finally {
          stopLoading();
        }
      }
    }
  };

  /*
    Prüft, ob die Bearbeitung von manuellen Daten erfolgt oder eines Files.
     */
  const checkInputSource = () => {
    if (returnExcel() !== undefined) {
      return "file";
    } else if (inputDataArray.length !== 0) {
      return "manuel";
    } else {
      APIError(noDataMessage);
      stopLoading();
      return false;
    }
  };

  /*
    validateKPoints validiert die K-Points, dass diese immer als Number übergeben werden.
     */
  const validateKPoints = (numberOfClusters) => {
    if (typeof numberOfClusters !== "number") {
      return parseInt(numberOfClusters);
    } else {
      return numberOfClusters;
    }
  };

  return {
    handleClick,
    validateKPoints,
    resultExport,
  };
}

export function CalculateButton({ localRemoteButton, setLocalRemoteButton }) {
  const { handleClick, resultExport } = HandleCalculateButtonClick(
    localRemoteButton,
    setLocalRemoteButton
  );

  return (
    <div>
      <button
        type="button"
        className="compute-btn button"
        onClick={handleClick}
      >
        Berechnen
      </button>
      <ExportExcelFile result={resultExport} />
    </div>
  );
}
