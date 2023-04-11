import './App.css'

export const App = () => {
  return (
    <div className='App'>
      {/* Heading */}
      <h1>Fire Emblem Engage</h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      <p className='PromptText'>Select your option and click Add</p>
      <div>
        {/* Input fields here here */}
        <button className='button'>Add</button>
        <button className='button'>Clear</button>
      </div>
    </div>
  )
}
