import './App.css'

export const App = () => {
  return (
    <div>
      {/* Heading */}
      <h1>Fire Emblem Engage</h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      <p className='prompt-text'>Select your option and click Add</p>
      <div className='option-row'>
        {/* Input fields here here */}
        <button className='add button'>Add</button>
        <button className='button'>Clear</button>
      </div>
    </div>
  )
}
