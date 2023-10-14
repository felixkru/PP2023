'use client'
import {useState, createContext, useContext} from 'react'
import {SwitchVariables} from './kmeans/switch-variables';
import {InputKPoints} from './kmeans/input-k-points';
import {CalculateButton} from './kmeans/calculateButton';
import {InputKPointsProvider} from './kmeans/input-k-points';
import {CreateManuelInputFields} from './kmeans/create-save-manuel-input';
import {HandeleSwitchVariablesProvider} from './kmeans/switch-variables';
import {HandleDynamicGeneratedInputFieldsProvider} from './kmeans/create-save-manuel-input';
import ScatterChart from './kmeans/scatter-chart';
import {CreateLocalRemoteButton} from "./kmeans/local-remote-button";
import './globals.css'
import {checkFileFormat} from "./utils/excelfilereader";
import { LoadingScreen, useLoadingStatus } from "./common/LoadingScreen";

export default function Home() {

    const { loading } = useLoadingStatus();

    const [localRemoteButton, setLocalRemoteButton] = useState(false);

    return (
        <HandeleSwitchVariablesProvider data-testid="handleSwitchVariablesProvider">
            <InputKPointsProvider>
                <HandleDynamicGeneratedInputFieldsProvider>
                    { loading ? (
                        <LoadingScreen />
                    ) : null }
                    <main className="mh-100 text-center container">
                        <div className='row'>
                            <div className='input-area col-12 col-lg-6'>
                                <div
                                    className='compute-container d-flex flex-column row-gap-3 flex-xl-row justify-content-xl-between align-items-center align-items-xl-end mb-5'>
                                    <SwitchVariables/>
                                    <CalculateButton localRemoteButton={localRemoteButton} setLocalRemoteButton={setLocalRemoteButton}/>
                                </div>
                                <InputKPoints/>
                                <section
                                    className='row-gap-3 justify-content-between align-items-center mb-5'>
                                    <div className='file-input'>
                                        <input onChange={checkFileFormat} accept={'.xlsx,.csv'} className="card-style form-control form-control-lg" type="file" id="excelFileInput" />
                                    </div>
                                    <CreateLocalRemoteButton localRemoteButton={localRemoteButton} setLocalRemoteButton={setLocalRemoteButton} />
                                </section>
                                <CreateManuelInputFields/>
                            </div>
                            <div className='output-area col12 col-lg-6 h-100'>
                                <ScatterChart/>
                            </div>
                        </div>
                    </main>
                </HandleDynamicGeneratedInputFieldsProvider>
            </InputKPointsProvider>
        </HandeleSwitchVariablesProvider>
    );
}
