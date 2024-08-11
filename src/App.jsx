import React, { useState } from 'react'
import Globe from './components/Globe'
import Selector from './components/Selector'

const App = () => {

  const [eType, setEtype] = useState('Coal')
  const handleType = (data) => {
    setEtype(data)
  }
  return (
    <div className='max-h-screen bg-black overflow-y-hidden'>
      <div className='flex flex-col justify-center items-center'> 
        <h4 className='text-white text-[2.5rem] font-semibold'>CO2 Emission from {eType} 2021</h4>
        <Selector setType={handleType}/>
      </div>
      <Globe eType={eType}/>
    </div>
  )
}

export default App