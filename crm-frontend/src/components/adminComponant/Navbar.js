import React from 'react'
import '../../assets/style/admincss/AdminNavbar.css'
import { NavLink} from 'react-router-dom'
import Logout from '../../pages/admin/Logout'

const Navbar = () => {
  return (
  <>
      <div id='Navbar'>
        <ul className='navitem'>
          {/* <li className='navlink'> <NavLink id='NavItems'  to='/admin'>IMRAN QURESHI</NavLink></li> */}
          <br/>
          <br/>
          {/* <li className='navlink'> <NavLink id='NavItems' to='/admin'>Home</NavLink></li> */}
          {/* <li className='navlink'> <NavLink id='NavItems' to='/admin/leads'>Leads</NavLink></li> */}
          {/* <li className='navlink'> <NavLink id='NavItems' to='/admin/employees'>Employees</NavLink></li> */}
          {/* <li className='navlink'> <NavLink  id='NavItems' to='/admin/reports'>Reports</NavLink></li> */}
          <br/>
          <br/>
          <li className='navlink'><Logout/> Logout</li>
        </ul>
      </div>
      <div>
      </div>
  </>


  )
}

export default Navbar