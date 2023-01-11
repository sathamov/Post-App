import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useInfoContext } from '../../Context'
import { LikeOutlined , DislikeOutlined , CommentOutlined} from "@ant-design/icons"

import "./ViewPost.css"
import { toast } from 'react-toastify'

export const ViewPost = () => {

  const navigate = useNavigate()

  const {baseURL , user , token} = useInfoContext()
  const params = useParams()

  const [post , setPost] = useState(null)
  const [update , setUpdate] = useState(false)
  const [comment , setCommet] = useState(false)

  const deletePost = async (postId) => {
    try {
      toast.loading('Wait...🤔')
      const res = await axios.delete(`${baseURL}post/${postId}` , {headers: {'access_token' : token}})
      navigate('/myposts')
      toast.dismiss()
      toast.info('Post Deleted 🥱')
    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message)
      // toast.info('An error occurred 😤')
    }
  }

  const addComment = async (e) => {
    if(e.keyCode === 13) {

      try {
        toast.loading('Wait 🥱')
        const res = await axios.post(`${baseURL}comment` , {'postId' : params.id , 'content' : e.target.value} , {headers : {'access_token' : token}})
        setUpdate(!update)
        toast.dismiss()
        toast.info(res.data.message)
        e.target.value = ""
      } catch (error) {
        toast.dismiss()
        toast.error(error.response.data.message)
        
      }
      
    }
  }

  const like = async (endpoint) => {
    try {
      const res = await axios.get(`${baseURL}${endpoint}/${params.id}`, {headers: {'access_token' : token}})
      setUpdate(!update)
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }

  useEffect(()=>{
    const getPost = async ()=> {
      try {
        const res = await axios.get(`${baseURL}post/${params.id}`)
        console.log(res);
        setPost(res.data[0]);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getPost()
  }, [params.id , baseURL , update] )

  return (
    <div className='nmadur'>

      <div className='container'> 
          <img className='img-fluid  d-block mx-auto my-3 harbalo-img' src={post?.image?.url} alt="" />
          <h1 className='text-center wearpro h2'> {post?.title} </h1>

          <p className='post-text post-content'> {post?.content}  <span className='text-info d-block'> {} </span> </p>

          <h5 className='text-end post-content '> {post?.author[0].name + '' + post?.author[0].surname} </h5>
          <Link className='d-block ms-auto text-end '> {post?.author[0].email} </Link>


          <div className="btn-box-post d-flex gap-1 justify-content-between">
            <Button className={post?.like.includes(user?.id) && 'bg-danger'} onClick={()=> like('like')}> <LikeOutlined /> {post?.like?.length} </Button>
            <Button className={post?.dislike.includes(user?.id) && 'bg-primary'} onClick={()=> like('dislike')}> <DislikeOutlined /> {post?.dislike?.length} </Button>
            <Button onClick={() =>setCommet(!comment)}> <CommentOutlined /> {post?.comments?.length}</Button>
            { user?.id === post?.author[0]._id && <Button className='bg-danger' onClick={()=> deletePost(post?._id)}> Delet </Button> }
          </div>

          <div className="comments mt-4">
            {
              comment && <input onKeyDown={addComment} name='comment' type="text" className='form-control apple text-dark my-3' placeholder='Write your comment' />
            }
            {comment && post?.comments.map(com =>{
              return(
              <div key={com?._id}>
                <p className='apple'> {com.content} <br /> 
                  <p className="text-info mb-0 comment-author"> {com?.author[0].name + '' + com?.author[0].surname} </p>
                </p>
              </div>
              )
            })}
          </div>

       </div>


    </div>
  )
}

