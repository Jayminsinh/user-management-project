import React from 'react'
import Form from '../components/Form'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../components/Home'

const Register = () => {
  const isAuth = useSelector(state => state.users.isAuth)
  if (isAuth) {
    return <Home/>
  }
  return (
    <section className="flex flex-1 items-center justify-center px-10 py-10">
      <div className="w-full max-w-lg mx-auto">
        <Form />
      </div>
    </section>
  )
}

export default Register
