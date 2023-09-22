'use client'
import { useState } from 'react'
import './globals.css'

export default function Home() {

  const [numberOfVariables, setNumberOfVariables] = useState(2);
  const [numberOfClusters, setNumberOfClusters] = useState(3);
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(event) {
    setNumberOfClusters(event.target.value);
  }

  function checkHandler() {
    if (isChecked) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  function onOptionChange(event) {
    setNumberOfVariables(event.target.value)
  }

  return (
    <main className="min-vh-100 text-center container">
      <header>PROG 2023</header>
      <div className='row'>
        <div className='input-area col-12 col-lg-6'>
          <div className='compute-container d-flex justify-content-between align-items-end mb-5'>
            <div className='number-of-variables-container text-start'>
              <p>Anzahl der Variablen</p>
              <div className='variable-card card-style'>
              <div className="form-check">
                <input className="variable-radio-input" type="radio" name="flexRadioDefault" id="flexRadioTwoVariables" value={2} checked={numberOfVariables == 2} onChange={onOptionChange} />
                <label className={'form-check-label ' + (numberOfVariables == 2 ? 'active-element' : null)} htmlFor="flexRadioTwoVariables">
                  Zwei Variablen
                </label>
              </div>
              <div className="form-check">
                <input className="variable-radio-input" type="radio" name="flexRadioDefault" id="flexRadioThreeVariables" value={3} checked={numberOfVariables == 3} onChange={onOptionChange} />
                <label className={'form-check-label ' + (numberOfVariables == 3 ? 'active-element' : null)} htmlFor="flexRadioThreeVariables">
                  Drei Variablen
                </label>
              </div>
              </div>
            </div>
            <button type="button" className='compute-btn button'>Berechnen</button>
          </div>
          <section className='slider-containter mb-5'>
            <div className='slider text-start'>
              <label htmlFor="numberClustersSlider" className="form-label">K = {numberOfClusters} <span className='hint'>(Anzahl der Cluster)</span></label>
              <input type="range" className="form-range" min="1" max="100" id="numberClustersSlider" value={numberOfClusters} onChange={handleChange} />
            </div>
          </section>
          <section className='d-flex justify-content-between align-items-center'>
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
          
        </div>
        <div className='output-area col12 col-lg-6'>
          <div>Ey, hier müsste Output sein</div>
        </div>
      </div>
    </main>
  )
}
