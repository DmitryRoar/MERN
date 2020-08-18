import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request(`/api/auth/register`, 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request(`/api/auth/login`, 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <div className="card blue my-card">
                    <div className="card-content white-text">
                      <span className="card-title">Authorize</span>
                      <div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter Email" 
                                id="email" 
                                type="text" 
                                name='email'
                                className='yellow-input'
                                value={form.email}
                                onChange={changeHandler}
                                autoComplete='off'
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter Password" 
                                id="password" 
                                type="password" 
                                name='password'
                                value={form.password}
                                className='yellow-input'
                                onChange={changeHandler}
                                autoComplete='off'
                                />
                                <label htmlFor="password">Email</label>
                            </div>
                      </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className='btn blue darken-4'
                        style={{marginRight: 10}}
                        onClick={loginHandler}
                        disabled={loading}
                        >
                             SignIn
                        </button>
                        <button
                        className='btn grey lighten-1 black-text'
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            SignUp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}