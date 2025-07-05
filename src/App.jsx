import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GridItem from './Components/GridItem'
import BentoGrid from './Components/BentoGrid'
import About from './Pages/About'

/*
 *About
 *Experinece
 *Projects
 *Skills
 *Education
 *Resume
 *Contact
 *


*/

function App() {


  return (
     <div className="min-h-screen w-full  bg-black ">
      
      <BentoGrid>
        <GridItem title="About Me" className="col-start-1 col-end-3 row-start-1 row-end-6   font-serif ">
          <About/>
        </GridItem>
         <GridItem title="Experience" className="col-start-3 col-end-5 row-start-1 row-end-4 bg-gray-900">
          
        </GridItem>
        <GridItem title="Project" className="col-start-5 col-end-7 row-start-2 row-end-5 bg-gray-900">
          
        </GridItem>
         <GridItem title="Skill" className="col-start-3 col-end-5 row-start-4 row-end-6 bg-gray-900">
          
        </GridItem>
        <GridItem title="Education" className="col-start-3 col-end-5 row-start-6 row-end-7 bg-gray-900">
          
        </GridItem>
        <GridItem title="Resume" className="col-start-5 col-end-7 row-start-1 row-end-2 bg-gray-900">
          
        </GridItem>
        <GridItem title="Contact" className="col-start-5 col-end-7 row-start-5 row-end-7 bg-gray-900">
          
        </GridItem>
        <GridItem title="Social" className="col-start-1 col-end-3 row-start-6 row-end-7 bg-gray-900">
          
        </GridItem>

        


        {/* <GridItem title="Projects" className="col-span-3 row-span-2">
          <ul className="list-disc pl-5">
            <li>Password Strength Predictor</li>
            <li>React Native Wallpaper App</li>
            <li>DSA Tracker Tool</li>
          </ul>
        </GridItem> */}

        {/* <GridItem title="Skills" className="col-span-2 row-span-1">
          <p>React, JavaScript, Tailwind CSS, Node.js, Python, DSA</p>
        </GridItem> */}

       
        {/* <GridItem title="Education" className="col-span-2">
          <p>BTech in Computer Science, 2022</p>
        </GridItem> */}

        {/* <GridItem title="Resume" className="col-span-2">
          <a href="#" className="text-blue-600 underline">Download Resume</a>
        </GridItem> */}

        {/* <GridItem title="Contact" className="col-span-2 row-span-2">
          <p>Email: vipul@example.com</p>
          <p>LinkedIn: /in/vipul</p>
          <p>GitHub: /vipuldev</p>
        </GridItem> */}
      </BentoGrid>
    </div>
  )
}

export default App
