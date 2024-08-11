import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Sphere } from "react-simple-maps"
import { ZoomableGroup } from "react-simple-maps"
import { Marker } from "react-simple-maps"
import { scaleLinear, scaleSequential, scaleLog } from 'd3-scale'
import { Graticule } from "react-simple-maps"
const  Globe = () => {
  const geoURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"


  const [counter, setCounter] = useState(-190.0);
  const [counter2, setCounter2] = useState(-53.0);
  const [coalData, setCoalData] = useState([])


  // const colorScale = scaleSequential()
 const colorScale =  scaleLog([1, 11000], ["red", "blue"])


  useEffect(() => {

    // fetch(geoURL)
    // .then(res => res.json())
    // .then(res => {

    //   const svgElement = document.getElementById('Bhutan');
    //   const rect = svgElement.getBoundingClientRect();
    
    //   const x = rect.x + window.scrollX;
    //   const y = rect.y + window.scrollY;
    
    //   console.log(`X: ${x}, Y: ${y}`);
    //   console.log(res)}
    // )

    const url = "http://127.0.0.1:8000/coal"
    fetch(url)
    .then(res => res.json())
    .then(res => {
        const data = Object.entries(JSON.parse(res['2021'])).map(([key,values]) => ({[key]:values}))
        setCoalData(data)
    })

  }, [])

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
          {/* projectionConfig={{
            rotate: [counter, counter2, 10],
            center: [-60,-337],
            scale: 80
          }} */}
         {/* <ZoomableGroup 
         center={[0,0]}
         zoom={1}
         maxZoom={9}
        //  onMoveStart={({ coordinates, zoom }) => {
            // setCounter(coordinates[0])
            // setCounter2(coordinates[1])
            // console.log(coordinates)
        // }}
        onMove={({ x, y, k, dragging }) => {
            setCounter(x)
            // console.log(x, y)
            setCounter2(y)
            console.log(x, y, k, dragging)
          }}
         > */}
         <Graticule
         stroke="#222222"
         step={[10,10]}

         />
        <Geographies geography={geoURL}>
          {({ geographies }) =>
            geographies.map((geo) => {

              // console.log(coalData.map(x => console.log(Object.keys(x)[0])))
              const numFind = coalData.find(x => Object.keys(x)[0].toLowerCase() === geo.properties.name.toLowerCase())
              const num = numFind ? Object.values(numFind)[0] : 0

             return (
              <Geography
              id={geo.properties.name}
              key={geo.rsmKey}
              geography={geo}
              fill={num ? colorScale(num) : "#F5F4F6"}
              className={geo.id}
              />
            )}
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default  Globe