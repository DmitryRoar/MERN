import React, { useContext } from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
          <nav>
            <div className="nav-wrapper light-blue darken-4" style={{padding: '0 2rem'}}>
              <Link to="/" className="brand-logo">Shorter</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href='/' onClick={logoutHandler}>Logout</a></li>
              </ul>
            </div>
        </nav>
    )
}