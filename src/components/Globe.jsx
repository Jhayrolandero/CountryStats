import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLog } from 'd3-scale'
import { Graticule } from "react-simple-maps"
import Tooltip from '@mui/material/Tooltip';

const  Globe = ({eType}) => {
  const geoURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

  const [coalData, setCoalData] = useState([])
  const [colorScale, setColorScale] = useState(() => scaleLog([1, 200000], ["red", "blue"]));
  // const type = 'Gas'
  
  // const colorScale =  scaleLog([1, 200000], ["red", "blue"])


  useEffect(() => {
    const url = `http://127.0.0.1:8000/${eType.toLowerCase()}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res['2021'])
      setCoalData(res['2021'].Countries)
      setColorScale(() => scaleLog([res['2021'].Min + 1, res['2021'].Max], ["red", "blue"]))
      })
  }, [eType])

  return (
    <div className='overflow-hidden'>
      <ComposableMap
      className='max-h-screen w-full'
      // height={350}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 180
      }}
      >
         <Graticule
         stroke="#2f2f2f"
         step={[10,10]}

         />
        <Geographies geography={geoURL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              
              const numFind = coalData.find(x => x.Country.toLowerCase() === geo.properties.name.toLowerCase() )
              console.log(eType)
              const num = numFind === undefined ? 1 : numFind[eType] < 1 ? numFind[eType] + 1 : numFind[eType]

             return (
              <Tooltip 
              title={`${geo.properties.name} / ${(num-1).toFixed(2)} co2 emission from ${eType}`}
              placement='top'
              followCursor={true}
              >
              <Geography
              id={geo.properties.name}
              key={geo.rsmKey}
              geography={geo}
              fill={num ? colorScale(num) : "#F5F4F6"}
              />
              </Tooltip>

            )}
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default  Globe