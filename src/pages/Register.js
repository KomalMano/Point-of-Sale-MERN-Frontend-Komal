import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // handle Form submit
  const handleSubmit = async (value) => {
    console.log(value)
      try {
        dispatch({
          type:'SHOW_LOADING'
        });
        //  server + itemRoutes + post k liye
        await axios.post('/api/users/register', value);
        message.success('Register Successfully');
        navigate('/login')
     } catch (error) {
        dispatch({ type: 'HIDE_LOADING'});
        console.log(error)
        message.error('Something went wrong for editing')
        console.log(error)
      }
    };
        // currently login user
        useEffect(() => {
          if(localStorage.getItem('auth')){
            localStorage.removeItem('auth')
            navigate('/login')
          }
        },[navigate])
  return (
    <>
    <div className='register'>
        <div className='register-form'>
        <h1>POS Software</h1>
        <h3>Register Page</h3>

        <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <p>
                Already Register Please
                <Link to="/login"> Login Here!</Link>
                </p>
              <Button type='primary' htmlType='submit'>Register</Button>
            </div>
          </Form>
        </div>
    </div>
    </>
  )
}

export default Register