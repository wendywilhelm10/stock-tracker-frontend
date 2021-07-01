import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import './SignupForm.css'
import Api from './Api'
import StockContext from './StockContext'

function SignupForm() {
    const history = useHistory();
    const {userLoggedIn} = useContext(StockContext);
    const [userErr, setUserErr] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [firstErr, setFirstErr] = useState(null);
    const [lastErr, setLastErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    let errText;

    async function handleClick(e) {
        e.preventDefault();
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const email = document.getElementById('email');
        
        const resp = await Api.signup(username.value, password.value, firstName.value, lastName.value, email.value);
        if (resp === 'signed up') {
            userLoggedIn(username.value);
            history.push('/stocks');
        } else {
            const userError = resp.filter(r => r.includes('username'));
            if (userError.length > 0) {
                errText = userError[0].slice(userError[0].indexOf('username') + 'username'.length);
                setUserErr(errText);
            } else if (userErr) {
                setUserErr(null);
            }
            const passError = resp.filter(r => r.includes('password'));
            if (passError.length > 0) {
                errText = passError[0].slice(passError[0].indexOf('password') + 'password'.length);
                setPassErr(errText);
            } else if (passErr) {
                setPassErr(null);
            }
            const firstError = resp.filter(r => r.includes('firstName'));
            if (firstError.length > 0) {
                errText = firstError[0].slice(firstError[0].indexOf('firstName') + 'firstName'.length);
                setFirstErr(errText);
            } else if (firstErr) {
                setFirstErr(null);
            }
            const lastError = resp.filter(r => r.includes('lastName'));
            if (lastError.length > 0) {
                errText = lastError[0].slice(lastError[0].indexOf('lastName') + 'lastName'.length);
                setLastErr(errText);
            } else if (lastErr) {
                setLastErr(null);
            }
            const emailError = resp.filter(r => r.includes('email'));
            if (emailError.length > 0) {
                errText = emailError[0].slice(emailError[0].indexOf('email') + 'email'.length);
                setEmailErr(errText);
            } else if (emailErr) {
                setEmailErr(null);
            }
        }
    }

    return (
        <div className='LoginForm'>
            <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                <h3>Sign Up</h3>
                <Card className='card'>
                    <CardBody>
                        <form>
                            <div className='form-group'>
                                <label className='SignupFormLabel'>Username</label>
                                <input className='form-control'
                                    type='text'
                                    id='username'
                                    required
                                />
                                <small className='SignupErr'>{userErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='SignupFormLabel'>Password</label>
                                <input className='form-control'
                                    type='password'
                                    id='password'
                                    required
                                />
                                <small className='SignupErr'>{passErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='SignupFormLabel'>First Name</label>
                                <input className='form-control'
                                    type='text'
                                    id='firstname'
                                    required
                                />
                                <small className='SignupErr'>{firstErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='SignupFormLabel'>Last Name</label>
                                <input className='form-control'
                                    type='text'
                                    id='lastname'
                                    required
                                />
                                <small className='SignupErr'>{lastErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='SignupFormLabel'>Email</label>
                                <input className='form-control'
                                    type='email'
                                    id='email'
                                    required
                                />
                                <small className='SignupErr'>{emailErr}</small>
                            </div>
                            <button onClick={handleClick} className='signup-btn btn btn-primary'>Submit</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default SignupForm