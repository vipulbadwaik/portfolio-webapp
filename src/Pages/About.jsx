import React from 'react'
import vbimg from '../assets/vbimg.svg';

const About = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-sans font-bol m-4 text-transparent bg-clip-text border-2 border-white rounded-4xl p-3 bg-gradient-to-br from-purple-500 to-pink-500'>VIPUL BADWAIK</h1>
        <img src={vbimg} className='h-60 '/>
    </div>
  )
}

export default About