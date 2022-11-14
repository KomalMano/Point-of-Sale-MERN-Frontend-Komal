import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {

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
        const res = await axios.post('/api/users/login', value);
        dispatch({ type: 'HIDE_LOADING'});
        message.success('User Login Successfully');
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate('/')
     } catch (error) {
        dispatch({ type: 'HIDE_LOADING'});
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
        <h3>Login Page</h3>

        <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <p>
                    Not a user Please
                <Link to="/register"> Register Here!</Link>
                </p>
              <Button type='primary' htmlType='submit'>Login</Button>
            </div>
          </Form>
        </div>
    </div>
    </>
  )
}

export default Login