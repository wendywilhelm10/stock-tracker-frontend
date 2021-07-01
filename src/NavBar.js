import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavbarBrand } from 'reactstrap'
import './NavBar.css'
import StockContext from './StockContext'

function NavBar() {
    const {user} = useContext(StockContext);
    
    if (user) {
        return (
            <>
            <Navbar className='nav-header'>
                <NavbarBrand className='brand'>
                    <i>Stock Tracker</i>
                </NavbarBrand>

                <Nav className='ml-auto navbar'>
                    <NavLink className='nav-stock' to='/Stocks'>Home Page</NavLink>
                    <NavLink className='nav-stock' to='/Watch'>Stocks to Watch</NavLink>
                    <NavLink className='nav-stock' to='/Own'>Stocks Own</NavLink>
                    <NavLink className='nav-stock' to='/Index'>Indexes to Watch</NavLink>
                    <NavLink className='nav-stock' to='/Profile'>Profile</NavLink>
                    <NavLink className='nav-stock' to='/Logout'>Logout</NavLink>
                </Nav>
            </Navbar>
            </>
        )
    }

    return (
        <>
        <Navbar className='nav-header'>
            <NavbarBrand className='brand'>
                <i>Stock Tracker</i>
            </NavbarBrand>

            <Nav className='ml-auto navbar'>
                <NavLink className='nav-login' to='/Login'>Login</NavLink>
                <NavLink className='nav-login' to='/Signup'>Sign Up</NavLink>
            </Nav>
        </Navbar>
        </>
    )
}

export default NavBar;