'use client'
import { useState, useEffect } from 'react';
import { getElementByClass, getValueByClass } from '../utils/element-functions';

function CustomElements () {

    const gridRow = 'row';
    const gridColumn = 'col-12 col-md-6';
    const gridCell = 'grid-cell';
    const inputK = 'inputK';
    const inputDataFile = 'inputDataFile';
    const btnSubmit = 'btn-submit'

    useEffect(() => {
        const button = getElementByClass('.btn-submit');
        button.addEventListener('click', () => {

        });
    }, []);

    return(
        <div className={gridRow}>
            <div className={gridColumn}>
                <form id="formKMeans">
                    <div className={gridCell}>
                        <label htmlFor="input-k">Bitte geben Sie Ihre Anzahl Cluster an:</label>
                        <input id="input-k" className={inputK} type={"number"} required={true}/>
                    </div>
                    <div className={gridCell}>
                        <label htmlFor="inputDataFile">Bittel laden Sie Ihre XLSX oder CSV Datei hoch:</label>
                        <input id="inputDataFile" className={inputDataFile} type={"file"}/>
                    </div>
                    <div className={gridCell}>
                        <button form="formKmeans" className={btnSubmit} type={"submit"}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomElements;