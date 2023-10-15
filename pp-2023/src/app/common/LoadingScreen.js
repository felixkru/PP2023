'use client'
import '../globals.css';
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoadingStatus = () => {
    return useContext(LoadingContext);
}

export const LoadingStatusProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    
    const startLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    return (
        <LoadingContext.Provider value={{ loading, startLoading, stopLoading}}>
            { children }
        </LoadingContext.Provider>
    )
}

export const LoadingScreen = () => {
    return (
        <div id="loading-container">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Lädt...</span>
            </div>
        </div>
    );
}