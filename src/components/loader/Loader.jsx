import React from 'react'
import './loader.css'
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#f0f0f0] flex items-center justify-center z-50">
      <div className="lds-dual-ring"></div>
    </div>
  )
}

export default Loader
