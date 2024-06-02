import React from 'react'
import { FaLinkedin, FaWhatsappSquare } from "react-icons/fa"

function Me() {
  return (
    <div className="profileCardContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="profileCard" style={{ textAlign: 'center' }}>
        <p className="pageHeader">House MarketPlace</p>
        <p className='mb-4 text-2xl font-light'>
          A demo React app to search and view details of real estate listings. This project is part of my React learning journey.
        </p>
        <p className='text-lg text-gray-400'>
          Version <span className='text-white'>1.0.0</span>
        </p>
        <p className='text-lg text-gray-400'>
          Created by{' '}
          <a className='text-white' href='https://github.com/Satish740'>
            Satish Jagadish
          </a>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <a href="https://www.linkedin.com/in/satish-jagadish-b2916a167/" target="_blank" rel="noreferrer" className="mr-2 text-2xl">
              <FaLinkedin />
            </a>
            <a href="http://api.whatsapp.com/send?phone=4146391388&text=Hello, I saw your github profile finder website." target="_blank" rel="noreferrer" className="text-2xl">
              <FaWhatsappSquare />
            </a>
          </div>
        </p>
      </div>
    </div>
  )
}

export default Me
