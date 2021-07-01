import './HomePage.css'
import { Link } from 'react-router-dom'

function HomePage() {

    return (
        <div className='HomePage'>
            <div className='container'>
                <h1>Stock Tracker</h1>
                <p>Watch a list of stocks and enter stocks you own to track your gains/losses.</p>
                <div className='HomePageButtons'>
                    <Link to='/login'>
                        <button className='home-btn btn btn-primary mr-3'>Login</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='home-btn btn btn-primary mr-3'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage