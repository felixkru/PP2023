"use client";
import { createContext, useState, useContext } from "react";

const DownloadContext = createContext();

export const useDownloadContext = () => {
  return useContext(DownloadContext);
};

export const DownloadContextProvider = ({ children }) => {
  const [chartFilled, setChartFilled] = useState(false);

  const chartReady = (value) => {
    setChartFilled(value);
  };

  return (
    <DownloadContext.Provider value={{ chartFilled, chartReady }}>
      {children}
    </DownloadContext.Provider>
  );
};
