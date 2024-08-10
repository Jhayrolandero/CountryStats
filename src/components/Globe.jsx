import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Sphere } from "react-simple-maps"
import { ZoomableGroup } from "react-simple-maps"
import { Marker } from "react-simple-maps"
import { Graticule } from "react-simple-maps"
const  Globe = () => {
  const geoURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"


  const [counter, setCounter] = useState(-190.0);
  const [counter2, setCounter2] = useState(-53.0);


  useEffect(() => {

    // try {
    //   const response = await fetch(url);
    //   if (!response.ok) {
    //     throw new Error(`Response status: ${response.status}`);
    //   }
  
    //   const json = await response.json();
    //   console.log(json);
    // } catch (error) {
    //   console.error(error.message);
    // }

    fetch(geoURL)
    .then(res => res.json())
    .then(res => {

      const svgElement = document.getElementById('Bhutan');
      const rect = svgElement.getBoundingClientRect();
    
      const x = rect.x + window.scrollX;
      const y = rect.y + window.scrollY;
    
      console.log(`X: ${x}, Y: ${y}`);
      console.log(res)}
    )



  }, [])
//   useEffect(() => {
    // const interval = setInterval(() => {
    //   setCounter(prevCounter => prevCounter + 0.5);
    //   setCounter2(prevCounter => prevCounter + 0.5);
    // }, 1); // increment every 1 millisecond
// 
    // return () => clearInterval(interval); // clean up the interval on component unmount
//   }, []);


  return (
    <div className='overflow-hidden'>
      <ComposableMap
      className='max-h-screen w-full'
      // height={350}
      projection='geoEquirectangular'
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
            geographies.map((geo) => (
              <Geography
              id={geo.properties.name}
              key={geo.rsmKey}
              geography={geo}
              fill="#FF5533"
              className={geo.id}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default  Globe