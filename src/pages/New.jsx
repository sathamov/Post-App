import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useInfoContext } from '../Context'

export const New = () => {

    const navigate = useNavigate()

    const fileRef = useRef()

    const {token , baseURL} = useInfoContext()

    const [post , setPost] = useState({
        title: "" ,
        content: "",
    })

    const handleInput = (e) => {
        setPost({...post , [e.target.name] : e.target.value})
    }

    const newPost = async (e) => {

        e.preventDefault()

        const data = new FormData(e.target)
        
        try {
         toast.loading('Wait...🥱')
         const res = await axios.post(`${baseURL}post`, data , {headers : {"access_token" : token , 'content-type' : 'multipart/form-data'}})

         toast.dismiss()
         toast.info(res.data.message)
         navigate('/myposts')
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }


  return (
    <div className='container'>
        <div className="w-100 w-md-75 mx-auto">
        <Form onSubmit={newPost}>
            <FormGroup>
                <Label for="exampleEmail"> Title </Label>
                <Input id="exampleEmail" name="title" placeholder="Enter Title 🧐" type="text" required onChange={handleInput} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleText"> Content </Label>
                <Input id="exampleText" name="content" type="textarea" placeholder='Enter Content 🧐'required onChange={handleInput} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile"> Image Post </Label>
                <Input ref={fileRef} id="exampleFile" name="image" type="file" required />
            </FormGroup>
            <Button> Save </Button>
        </Form>

        </div>
    </div>
  )
}

