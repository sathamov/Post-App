import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { useInfoContext } from '../../Context'

import "./RegistorForm.css"

export const RegistorForm = () => {

  const navigate = useNavigate()

  const {baseURL , setToken , setShow} = useInfoContext()

  const [signup , setSignup] = useState(false)

  const [data , setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    setData({...data , [e.target.name] : e.target.value})
  }

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      toast.loading("Wait...")

      if(signup) {
        const res = await axios.post(`${baseURL}login` , data)
        localStorage.setItem('access_token' , res.data.token)
        setToken(res.data.token)
        setShow(true)
        navigate('/')
        toast.dismiss()
        toast.info(res.data.message)
      }else {
        const res = await axios.post(`${baseURL}signup` , data)
        localStorage.setItem('access_token' , res.data.token)
        setToken(res.data.token)
        setShow(true)
        navigate('/')
        toast.dismiss()
        toast.info(res.data.message)
      }

    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='w-75 mx-auto registor-form'>
      <h1 className='my-5 mx-auto text-center text-white'> {signup ? 'Log In' : 'Sign Up'} </h1>
    <Form onSubmit={submitForm}>
      <FormGroup className={signup ? 'd-none' : 'd-block'}>

        <Label for="exampleName" hidden> Name </Label>
        <Input onChange={ handleInput } id="exampleName" name="name" placeholder="Name" type="text"/>

      </FormGroup>

      {' '}

      <FormGroup className={signup ? 'd-none' : 'd-block'}>

        <Label for="exampleSurName" hidden> SurName </Label>
        <Input onChange={ handleInput } id="exampleSurname" name="surname" placeholder="SurName" type="text"/>

      </FormGroup>

      {' '}

      <FormGroup>

        <Label for="exampleEmail" hidden> Email</Label>
        <Input onChange={ handleInput } id="exampleEmail" name="email" placeholder="Email" type="email"/>

      </FormGroup>

      {' '}


      <FormGroup>
         <Label for="examplePassword" hidden> Password </Label>
        <Input onChange={ handleInput } id="examplePassword" name="password" placeholder="Password" type="password" />
      </FormGroup>

      {' '}

      <span onClick={()=> setSignup(!signup)} className='text-white my-3 fw-bold d-block link-info sasha'> {signup ? "I don't have account!" : 'I already have account!'}  </span>
      <button className='bg-primary btn text-white fw-bold'> {signup ? 'Log In' : 'Sign Up'} </button>
    </Form>

    </div>
  )
}

