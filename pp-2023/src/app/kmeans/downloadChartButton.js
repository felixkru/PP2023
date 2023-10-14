"use client";
import { Chart } from "chart.js/auto";
import { useDownloadContext } from "../context/downloadContext";
import { APIError } from "../utils/userErrors";

let isFilled = false;

export const GenerateImage = () => {
  if (isFilled) {
    const chart = Chart.getChart("myChart");
    let image = chart.toBase64Image();

    var a = document.createElement("a");
    a.href = image;
    a.download = "chart.jpeg";

    a.click();
  } else {
    APIError("Das Chart enthält momentan keine Daten");
  }
};

export const DownloadButton = () => {
  const { chartFilled } = useDownloadContext();
  if (chartFilled) {
    isFilled = true;
  } else {
    isFilled = false;
  }

  return (
    <button
      id="downloadButton"
      type="button"
      className="button mt-5"
      onClick={GenerateImage}
    >
      Download Chart
    </button>
  );
};
