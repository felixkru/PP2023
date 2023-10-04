'use client'
import {useRef, useState} from 'react'
import {SwitchVariables} from './kmeans/switch-variables';
import {InputKPoints} from './kmeans/input-k-points';
import {CalculateButton} from './kmeans/calculateButton';
import {InputKPointsProvider} from './kmeans/input-k-points';
import {CreateManuelInputFields} from './kmeans/create-save-manuel-input';
import {HandeleSwitchVariablesProvider} from './kmeans/switch-variables';
import {HandleDynamicGeneratedInputFieldsProvider} from './kmeans/create-save-manuel-input';
import ScatterChart from './kmeans/scatter-chart';
import './globals.css'
import ExcelFileUploader from './components/ExcelFileUploader';

export default function Home() {

    const [isChecked, setIsChecked] = useState(false);

    function checkHandler() {
        if (isChecked) {
            setIsChecked(false)
        } else {
            setIsChecked(true)
        }
    }

    return (
        <HandeleSwitchVariablesProvider>
            <InputKPointsProvider>
                <HandleDynamicGeneratedInputFieldsProvider>
                    <main className="mh-100 text-center container">
                        <div className='row'>
                            <div className='input-area col-12 col-lg-6'>
                                <div
                                    className='compute-container d-flex flex-column row-gap-3 flex-xl-row justify-content-xl-between align-items-center align-items-xl-end mb-5'>
                                    <SwitchVariables/>
                                    <CalculateButton/>
                                </div>
                                <InputKPoints/>
                                <section
                                    className='d-flex flex-column flex-xxl-row row-gap-3 justify-content-between align-items-center mb-5'>
                                    <div>
                                        <ExcelFileUploader />
                                    </div>
                                    <div className='toggle-switch d-flex align-items-center'>
                                    <span
                                        className={'computingOptions ' + (!isChecked ? "active-element" : null)}>Lokal</span>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch"
                                                   id="serverClientSwitch" checked={isChecked} onChange={checkHandler}/>
                                        </div>
                                        <span
                                            className={'computingOptions ' + (isChecked ? "active-element" : null)}>Serverseitig</span>
                                    </div>
                                </section>
                                <CreateManuelInputFields/>
                            </div>
                            <div className='output-area col12 col-lg-6'>
                                <ScatterChart/>
                            </div>
                        </div>
                    </main>
                </HandleDynamicGeneratedInputFieldsProvider>
            </InputKPointsProvider>
        </HandeleSwitchVariablesProvider>
    );
}
