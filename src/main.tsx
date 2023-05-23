import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import * as Toast from '@radix-ui/react-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toast.Provider>
      <App />
    </Toast.Provider>
  </React.StrictMode>
)
