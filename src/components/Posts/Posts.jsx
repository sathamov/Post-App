import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInfoContext } from '../../Context'
import { Post } from '../Post/Post'
import Loader from "../../img/loader.gif"

import "./Posts.css"
import { Link } from 'react-router-dom'

export const Posts = ({props}) => {

    const {baseURL , token , posts , setPosts} = useInfoContext()

    useEffect(()=> {
        const getPosts = async () => {

            try {
                if(props === 'myposts') {
                  
                  const res = await axios.get(`${baseURL}my` , {headers: {"access_token" : token}})

                  setPosts(res.data)
                  
                } else {

                  const res = await axios.get(`${baseURL}post` , {headers: {"access_token" : token}})
  
                  setPosts(res.data)
                }

                
            } catch (error) {
                console.log(error);
            }

        }
        getPosts()
    }, [baseURL , token])

  return (
    <div className='posts'>
      
      <div className="container">
        {
          props === 'myposts' && <Link to="/new"> New Post + </Link>
        }

        {
          posts.length > 0 ? 

          <>
            <h1 className='text-center' > Last PopulaR Posts </h1>


            <div className="row">

              {
                posts.map((post , i) =>{
                  return(
                    <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
                      <Post post={post} />
                    </div>
                  )
                })
              }

            </div>

          </> : 

          <>
            <div className='d-flex flex-column justify-content-center align-items-center loader-gif'>
              <img className='d-flex flex-column justify-content-center align-items-center' width={300} src={Loader} alt="Loader" />
            </div>
          </>
        }


      </div>

    </div>
  )
}


