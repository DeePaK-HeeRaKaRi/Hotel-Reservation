import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import './Navbar.css'
function Navbar() {
 const {user,dispatch}=useContext(AuthContext)
 const logout = () => {
  dispatch({type:'LOGOUT'})
 }
  return (
    <div className='navbar'>
        <div className='navContainer'>
        <Link to='/' style={{color:'inherit',textDecoration:"none"}}>
        <span className='logo'>Hotel Reservation</span>
        </Link>
            
          {!user ?
           (<div className='navItems'>
            <button className='navButton'>Register</button>
            <Link to='/login'>
              <button className='navButton'>Login</button>
            </Link>
            </div> )
            :
            <>
            <div className='navItems'>
              <button className='navButton'>{user.username}</button>
              <button className='navButton' onClick={logout}>Logout</button>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default Navbar