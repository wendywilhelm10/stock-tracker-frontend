import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'reactstrap'
import './NavBar.css'
import StockContext from './StockContext'

function NavBar() {
    const {user} = useContext(StockContext);
    
    if (user) {
        return (
            <div className='Navigation'>
                <Navbar expand='md'>
                    <NavLink exact to='/' className='navbar-brand'>
                        Stock Tracker
                    </NavLink>

                    <Nav className='ml-auto Navbar' navbar>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Stocks'>Home Page</NavLink>
                        </NavItem>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Watch'>Stocks to Watch</NavLink>
                        </NavItem>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Own'>Stocks Own</NavLink>
                        </NavItem>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Index'>Index to Watch</NavLink>
                        </NavItem>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Profile'>Profile</NavLink>
                        </NavItem>
                        <NavItem className='NavItem'>
                            <NavLink className='nav-item mr-4' to='/Logout'>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    return (
        <div className='Navigation'>
            <Navbar expand='md'>
                <NavLink exact to='/' className='navbar-brand'>
                    Stock Tracker
                </NavLink>

                <Nav className='ml-auto Navbar' navbar>
                    <NavItem className='NavItem'>
                        <NavLink className='nav-item mr-4' to='/Login'>Login</NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                        <NavLink className='nav-item mr-4' to='/Signup'>Sign Up</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;