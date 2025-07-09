import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
      </form>
    </div>
  )
}

export default Register
