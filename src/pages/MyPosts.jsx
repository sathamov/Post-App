import React from 'react'
import { Posts } from '../components/Posts/Posts'

export const MyPosts = () => {
  return (
    <div>
        <main>
         <Posts props={'myposts'} />
        </main>
    </div>
  )
}

