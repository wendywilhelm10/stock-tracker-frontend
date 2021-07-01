import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import StockContext from './StockContext'

function Logout() {
    const {user, userLoggedIn} = useContext(StockContext);
    const history = useHistory()

    if (!user) {
        history.push('/');
    }

    userLoggedIn(null);
    localStorage.removeItem('stocktracker');

    return (
        'logged out'
    )
}

export default Logout