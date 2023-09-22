import './globals.css'

export default function Home() {
  return (
    <main className="min-vh-100 text-center container">
      <header>PROG 2023</header>
      <div className='row'>
        <div className='input-area col-12 col-md-6'>
          <div className='compute-container d-flex justify-content-between align-items-end mb-5'>
            <div className='number-of-variables-container text-start'>
              <p>Anzahl der Variablen</p>
              <div className='variable-card card-style'>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioTwoVariables" checked />
                <label class="form-check-label" for="flexRadioTwoVariables">
                  Zwei Variablen
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioThreeVariables" />
                <label class="form-check-label" for="flexRadioThreeVariables">
                  Drei Variablen
                </label>
              </div>
              </div>
            </div>
            <button type="button" className='compute-btn button'>Berechnen</button>
          </div>
          <div className='slider-containter'>
            <p>K = 19 <span>(Anzahl der Cluster)</span></p>
            <div className='slider'>

            </div>
          </div>
          <div className='file-input d-inline'>File Input</div>
          <div className='toggle-switch d-inline'>Toggle Switch</div>
        </div>
        <div className='output-area col12 col-md-6'>
          <div>Ey, hier müsste Output sein</div>
        </div>
      </div>
    </main>
  )
}
