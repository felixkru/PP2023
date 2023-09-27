'use client'
import { useState } from 'react'
import Image from 'next/image'
import {SwitchVariables} from './kmeans/switch-variables';
import {InputKPoints} from './kmeans/input-k-points';
import {CalculateButton} from './kmeans/calculateButton';
import {InputKPointsProvider} from './kmeans/input-k-points';
import './globals.css'

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
      <InputKPointsProvider>
        <main className="mh-100 text-center container">
          <div className='row'>
            <div className='input-area col-12 col-lg-6'>
              <div className='compute-container d-flex flex-column row-gap-3 flex-xl-row justify-content-xl-between align-items-center align-items-xl-end mb-5'>
                <SwitchVariables/>
                <CalculateButton/>
              </div>
              <InputKPoints/>
              <section className='d-flex flex-column flex-xxl-row row-gap-3 justify-content-between align-items-center mb-5'>
                <div className='file-input'>
                  <input className="card-style form-control form-control-lg" type="file" id="formFile" />
                </div>
                <div className='toggle-switch d-flex align-items-center'>
                  <span className={'computingOptions ' + (!isChecked ? "active-element" : null)}>Lokal</span>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="serverClientSwitch" checked={isChecked} onChange={checkHandler} />
                  </div>
                  <span className={'computingOptions ' + (isChecked ? "active-element" : null)}>Serverseitig</span>
                </div>
              </section>
              <section id='vectors' className='mb-5'>
                Hier kommen die Inputs mit den Vektoren hin
              </section>
              <section id='addVectorButton' className='mb-5'>
                <button type="button" className='plus-button'>
                  <Image src="/plus-icon.svg" width={50} height={50} alt="Plus Icon" />
                </button>
              </section>
            </div>
            <div className='output-area col12 col-lg-6'>
              <div>Ey, hier müsste Output sein</div>
            </div>
          </div>
        </main>
      </InputKPointsProvider>
  )
}
