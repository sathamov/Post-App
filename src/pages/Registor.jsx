import React from 'react'
import { RegistorForm } from '../components/RegistorForm/RegistorForm'

export const Registor = () => {
  return (
    <div className='registor'>
      <div className="container">

      <div className="row">

        <div className="col-12 col-md-6 p-3 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-white">JS MEDIA</h1>
          <h2 className='text-white' > WebStar poduction 2022 </h2>
        </div>

        <div className="col-12 col-md-6 p-3">
          <RegistorForm /> 
        </div>

      </div>

      </div>
    </div>
  )
}


