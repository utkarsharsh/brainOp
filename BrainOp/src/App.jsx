import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux'
import './App.css'
import store from './store/store.js'
import Signup from './components/Signup'
function App() {
  return <>
   <Provider store={store}>
  <Signup/>
  </Provider>
  </>
 

}

export default App
