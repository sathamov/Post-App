import React from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { LikeOutlined , DislikeOutlined , CommentOutlined} from "@ant-design/icons"

import "./Post.css"
import { useNavigate } from 'react-router-dom'

export const Post = ({post}) => {

  const navigate = useNavigate()

  const showPost = (e) => {
    console.log();
    navigate(`/post/${e.target.id}`)
  }

  return (
    <div>
        <Card style={{ width: '100%'}} >
            <img alt="Sample" className='post-img' src={post?.image?.url} />
            <CardBody>
                <CardTitle className='bvlgari' tag="h5"> {post?.title} </CardTitle>

                <CardText className='text-truncate' style={{height:"50px" , overflow: "hidden"}}> {post?.content} </CardText>

                <div className="btn-box-post d-flex gap-1 justify-content-between">
                    <Button> <LikeOutlined /> {post?.like?.length} </Button>
                    <Button> <DislikeOutlined /> {post?.dislike?.length} </Button>
                    <Button> <CommentOutlined /> {post?.comments?.length} </Button>
                    <Button onClick={showPost} id={post?._id}> More </Button>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}


