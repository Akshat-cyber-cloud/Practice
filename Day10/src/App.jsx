import React from 'react'
import { useState } from 'react'
import AccountInfo from './pages/AccountInfo';
import Profile from './pages/Profile';

const App = () => {

  const[step, setStep] = useState(1);

  return (
    <div style={{
      width: "500px",
      margin: "50px auto",
      textAlign: "center"
    }}>
        <h1>Multi Step Signup Form</h1>

        {step === 1 && <AccountInfo step={step} setStep={setStep} />}
        {step === 2 && <Profile step={step} setStep={setStep} />}
        {step === 3 && <h2>Confirm Details</h2>}

        <br />

        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}

        {" "}

        {step < 3 && (
          <button onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}

        {" "}

        {step === 3 && (
          <button>
            Submit
          </button>
        )}
    </div>
  )
}

export default App