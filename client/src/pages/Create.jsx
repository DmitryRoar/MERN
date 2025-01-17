import React, {useState, useEffect} from 'react'
import { useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const Create = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setLink(event.target.value)
    }
    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                    placeholder="Enter Link" 
                    id="link" 
                    type="text" 
                    name='email'
                    onChange={changeHandler}
                    onKeyPress={pressHandler}
                    value={link}
                    />
                    <label htmlFor="link">Enter Link</label>
                </div>
            </div>
        </div>
    )
}