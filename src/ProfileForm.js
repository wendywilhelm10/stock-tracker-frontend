import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import StockContext from './StockContext'
import Api from './Api'
import './ProfileForm.css'

function ProfileForm() {
    const history = useHistory();
    const {user} = useContext(StockContext);
    const [userInfo, setUserInfo] = useState(null);
    const [saveBtn, setSaveBtn] = useState();
    const [firstErr, setFirstErr] = useState(null);
    const [lastErr, setLastErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    let errText;

    if (!user) {
        history.push('/')
    }

    useEffect(() => {
        let resp;
        async function getUser() {
            try {
                resp = await Api.getUserInfo(user);
                if (resp.user) {
                    const firstName = document.getElementById('firstname');
                    firstName.value = resp.user.first_name;
                    const lastName = document.getElementById('lastname');
                    lastName.value = resp.user.last_name;
                    const email = document.getElementById('email');
                    email.value = resp.user.email;
                }
               } catch (e) {
                console.log('error ', e);
            }
            setUserInfo(resp.user)
        }

        getUser();
    }, [])

    async function handleClick(e) {
        let data;
        e.preventDefault();
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        
        if (userInfo.first_name !== firstName) {
            data = {firstName};
        }
        if (userInfo.last_name !== lastName) {
            data = {...data, lastName};
        }
        if (userInfo.email !== email) {
            data = {...data, email}
        }
        if (data === undefined) {
            return;
        }

        try {
            const resp = await Api.updateInfo(userInfo.id, data);
            if (resp.user) {
                document.getElementById('firstname').value = resp.user.first_name;
                document.getElementById('lastname').value = resp.user.last_name;
                document.getElementById('email').value = resp.user.email;
                if (firstErr) {
                    setFirstErr(null);
                }
                if (lastErr) {
                    setLastErr(null);
                }
                if (emailErr) {
                    setEmailErr(null);
                }
                setSaveBtn(2);
            } else {
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
        } catch (e) {
            console.log('error ', e);
        }      
    }

    function handleOnChange() {
        setSaveBtn(1);
    }

    function handleCancel() {
        history.push('/stocks');
        return;
    }

    return (
        <div className='ProfileForm'>
            <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                <h3>Update Profile</h3>
                <Card className='card'>
                    <CardBody>
                        <form>
                            <div className='form-group'>
                                <label className='ProfileFormLabel'>First Name</label>
                                <input className='form-control'
                                    type='text'
                                    id='firstname'
                                    onChange={handleOnChange}
                                    required
                                />
                                <small className='ProfileErr'>{firstErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='ProfileFormLabel'>Last Name</label>
                                <input className='form-control'
                                    type='text'
                                    id='lastname'
                                    onChange={handleOnChange}
                                    required
                                />
                                <small className='ProfileErr'>{lastErr}</small>
                            </div>
                            <div className='form-group'>
                                <label className='ProfileFormLabel'>Email</label>
                                <input className='form-control'
                                    type='email'
                                    id='email'
                                    onChange={handleOnChange}
                                    required
                                />
                                <small className='ProfileErr'>{emailErr}</small>
                            </div>
                            <button onClick={handleCancel} className='profile-cancel-btn btn btn-primary'>Cancel</button>
                            {saveBtn === 1 &&
                                <button onClick={handleClick} className='profile-btn btn btn-success'>Save</button>
                            }
                            {saveBtn === 2 &&
                                <span id='save-profile-success'>Save Successful</span>
                            }
                            </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ProfileForm