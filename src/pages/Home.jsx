import React from 'react'
import { Posts } from '../components/Posts/Posts'


export const Home = () => {
  return (
    <div className='Home'>

      <main>
        <Posts props={'home'} />
      </main>

    </div>
  )
}


