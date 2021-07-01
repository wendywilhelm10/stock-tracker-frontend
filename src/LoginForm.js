import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import './LoginForm.css'
import Api from './Api'
import StockContext from './StockContext'

function LoginForm() {
    const history = useHistory();
    const {userLoggedIn} = useContext(StockContext);
    const [loginErr, setLoginErr] = useState(null);
    
    async function handleClick(e) {
        e.preventDefault();
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        const resp = await Api.login(username.value , password.value);
        if (resp === 'logged in') {
            userLoggedIn(username.value);
            history.push('/stocks');
        } else {
            setLoginErr(resp);   
        }
    }

    return (
        <div className='LoginForm'>
            <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                <h3>Log In</h3>
                <Card className='card'>
                    <CardBody>
                        <form>
                            <div className='form-group'>
                                <label className='LoginFormLabel'>Username</label>
                                <input className='form-control'
                                    type='text'
                                    id='username'
                                    required
                                />
                                <small className='LoginErr'>{loginErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='LoginFormLabel'>Password</label>
                                <input className='form-control'
                                    type='password'
                                    id='password'
                                    required
                                />
                            </div>
                            <button onClick={handleClick} className='login-btn btn btn-primary'>Submit</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default LoginForm