"use client";
import { APIError } from "../utils/userErrors";
import { returnExcel } from "../utils/excelfilereader";
import { useLoadingStatus } from "../common/LoadingScreen";

export const validateLengthOfData = (data, kPoints) => {
  if (data.length < kPoints) {
    const error =
      "Sie haben mehr Cluster, als Datenpunkte bereitgestellt. Eine Berechnung ist mit " +
      "diesen Parametern nicht möglich.";
    APIError(error);
    return false;
  }
  return true;
};

export const createFormData = async (KPoints, dataArrayForWorking) => {
  /*
    Erstellung eines Form-Data Objektes. Innerhalb des Objektes können mittels eines Key, Value Verfahren
    einzelne Datei-Objekte erstellt werden.
     */
  const formData = new FormData();

  if (dataArrayForWorking) {
    /*
        Auslesen der manuellen Datenpunkte, diese werden anschließend als Datei, einem formData Objekt übergeben.
         */
    if (validateLengthOfData(dataArrayForWorking, KPoints) === false) {
      return;
    }
    const dataPoints = {
      data_points: dataArrayForWorking,
    };
    const jsonData = JSON.stringify(dataPoints);
    const file = new Blob([jsonData], { type: "application/json" });
    formData.append("file", file, "dataPoints.json");
  } else {
    /*
        Aufruf von returnExcel und hinzufügen der geladenen Datei einem formData-Objekt.
         */
    const file = await returnExcel();
    formData.append("file", file, `${file.name}`);
  }

  return formData;
};

export const apiPostRequest = async (
  url,
  kForURL,
  KPoints,
  dataArrayForWorking
) => {
  const formData = await createFormData(KPoints, dataArrayForWorking);

  /*
    Die Url wird dynamisch generiert. Grund ist die Anforderung aus dem Backend, dass Parameter als Get übergeben werden,
    nur die Dateien werden mittels als Post übergeben.
     */
  const numberKRuns = "&number_kmeans_runs=20";
  const urlBearbeitet = url + "?" + kForURL + numberKRuns;
  try {
    const response = await fetch(urlBearbeitet, {
      mode: "cors",
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    /*
        Es wird der Response zurückgegeben.
         */
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      const customError =
        "Ihre Datei konnte von der API nicht verarbeitet werden. Versuchen " +
        "Sie es lokal.";
      APIError(customError + " " + result.detail);
    }
  } catch (error) {
    // Behandlung von Fehlern im globalen Kontext
    throw new Error(error);
  }
};

export const apiGetStateOfTask = (taskId, maxVersuch) => {
  /*
    Generieren der Request-URl
     */
  const url =
    "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/kmeans/status/";
  const completeUrl = url + taskId;

  /*
    Die Funktion makeRequest führt einen asynchronen Request an das Backend durch, um den Status der zu bearbeitenden
    Task zu bekommen.
     */
  const makeRequest = async () => {
    try {
      const result = await fetch(completeUrl, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      /*
            Bei gültigem 200 Status und dem Result.
             */
      const aktuellesIntervall = 3000;
      const response = await result.json();
      if (result.status === 200) {
        if (response.status === "completed") {
          return 1;
        } else if (maxVersuch > 0 && response.status === "Data Preparation") {
          await new Promise((resolve) =>
            setTimeout(resolve, aktuellesIntervall)
          );
          maxVersuch = maxVersuch - 1;
          return makeRequest();
        } else {
          APIError(
            " Timeout! Versuchen Sie eine lokale Berechnung oder ändern Sie Ihre Parameter!"
          );
          throw new Error("Fehler beim Response!");
        }
      } else {
        APIError(
          "Ihre Datei wurde von der API als ungültig empfunden. Bitte prüfen Sie diese, oder versuchen es lokal."
        );
        throw new Error(response.detail);
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return makeRequest();
};

/*
Die Funktion apiGetResult, fragt bei Aufruf das Ergebnis von der Backend-Api, anhand der TasID ab.
 */
export const apiGetResult = async (taskId) => {
  try {
    /*
        Zusammengesetzte URL für den GET-Request.
         */
    const url =
      "https://kmeans-backend-test-u3yl6y3tyq-ew.a.run.app/kmeans/result/";
    const completeUrl = url + taskId;

    const response = await fetch(completeUrl, {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    if (response.status === 200) {
      return result;
    } else {
      APIError(result.detail);
    }
  } catch (err) {
    throw new Error(err);
  }
};

/*
Führt die beiden Funktionen getState und getResult kontrolliert aus.
 */
export const handleApiCommunication = async (resultPost, maxVersuche) => {
  try {
    const resultGetStateOfTask = await apiGetStateOfTask(
      resultPost.TaskID,
      maxVersuche
    );
    /*
        Liefert die apiGetStateOfTask eine 1 zurück, ist der Response erfolgreich und kann verarbeitet werden.
         */
    if (resultGetStateOfTask === 1) {
      return await apiGetResult(resultPost.TaskID);
    }
  } catch (err) {
    /*
        Ist die Berechnung zu umfassend, dass das Zeitlimit reißt, wird dem Nutzer in dem catch-Block ein Error angezeigt.
         */ throw new Error(err);
  }
};
/*
Die Funktion nimmt einen Promise auf und führt diesen aus. Ebenfalls wir ein Parameter Timeout aufgenommen.
Ist der Timeout abgelaufen, wird ein fehler zurückgegeben. Andernfalls das Result des Promises.
 */
export const runWithTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    ),
  ]);
};
