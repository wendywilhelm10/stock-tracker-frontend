// import { useContext, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
// import Api from './Api'
import HomePage from './HomePage'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import StocksMain from './StocksMain'
import StocksWatchList from './StocksWatchList'
import StocksOwnList from './StocksOwnList'
import IndexWatch from './IndexWatch'
import ProfileForm from './ProfileForm'
import Logout from './Logout'
// import StockContext from './StockContext'

function Routes() {
    // const history = useHistory();
    // const {userLoggedIn} = useContext(StockContext);
    
    // useEffect(() => {
    //     async function getUserData() {
    //         console.log('routes, get local storage');
    //         if (localStorage.getItem('stocktracker')) {
    //             console.log('local storage for user');
    //             const stocktracker = localStorage.getItem('stocktracker');
    //             const stockObj = JSON.parse(stocktracker);
    //             Api.setToken(stockObj.token);
    //             userLoggedIn(stockObj.username); 
    //             history.push('/stocks');
    //         }
    //     }
    //     getUserData();
    // }, [])

    return (
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route exact path='/login'>
                <LoginForm />
            </Route>
            <Route exact path='/signup'>
                <SignupForm />
            </Route>
            <Route exact path='/stocks'>
                <StocksMain />
            </Route>
            <Route exact path='/watch'>
                <StocksWatchList />
            </Route>
            <Route exact path='/own'>
                <StocksOwnList />
            </Route>
            <Route exact path='/index'>
                <IndexWatch />
            </Route>
            <Route exact path='/profile'>
                <ProfileForm />
            </Route>
            <Route exact path='/logout'>
                <Logout />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default Routes