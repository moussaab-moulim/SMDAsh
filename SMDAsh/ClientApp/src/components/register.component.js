import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { registerUser } from './../redux/actions/auth/authActionCreators';

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ firstName: false, lastName: false, username: false, password: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else dispatchRegisterAction(firstName, lastName, username, password,
            () => {
                toast(<Alert severity="success">Registered and Logged In Successfully!</Alert>)
                const userName = JSON.parse(localStorage.getItem('USER_INFO')) || '';
                
                toast(<Alert icon={false} severity="success"> <SentimentVerySatisfiedIcon /> Welcome <b>{userName.fullName} !</b></Alert>, { delay: 500 })
            },
            (message) =>{
            toast(<Alert severity="error">{message}</Alert>) 
            
            });
    };

    const handleCancelForm = (event) => {
        event.preventDefault();
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setError({ firstName: false, lastName: false, username: false, password: false });
    };

    const isFormInvalid = () => (!firstName || !lastName || !username || !password);

    const updateErrorFlags = () => {
        const errObj = { firstName: false, lastName: false, username: false, password: false };
        if (!firstName) errObj.firstName = true;
        if (!lastName) errObj.lastName = true;
        if (!username) errObj.username = true;
        if (!password) errObj.password = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <h2>New User ?</h2>
            <h4>Create an account</h4>
            <br />

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input noValidate id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`form-control ${error.firstName ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input noValidate id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`form-control ${error.lastName ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="email1">Email Address</label>
                    <input noValidate id="email1"
                        type="email"
                        name="username"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`form-control ${error.username ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input noValidate id="password1"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>

                <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#008080"}}>
                    Register | <i className="fas fa-user-plus"></i>
                </button>
                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-times"></i>
                </button>
            </form>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (firstName, lastName, username, password, onSuccess, onError) =>
        dispatch(registerUser({ firstName, lastName, username, password }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(RegisterForm);
