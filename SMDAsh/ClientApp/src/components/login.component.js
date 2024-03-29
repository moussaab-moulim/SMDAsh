import React, { useState }from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert';
import { loginUser } from './../redux/actions/auth/authActionCreators';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const LoginForm = ({ dispatchLoginAction }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ username: false, password: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) {
            updateErrorFlags();
        } 
        else {  
            dispatchLoginAction(username, password,
            () => {
                toast(<Alert severity="success">Logged In Successfully!</Alert>)
                const userName = JSON.parse(localStorage.getItem('USER_INFO')) || '';
                
                toast(<Alert icon={false} severity="success"> <SentimentVerySatisfiedIcon /> Hello <b>{userName.fullName} !</b></Alert>, { delay: 500 })
            },
            (message) =>{
            toast(<Alert severity="error">{message}</Alert>) 
            
            });
        }
    };

    const handleCancelForm = event => {
        event.preventDefault();
        setUsername('');
        setPassword('');
        setError({ username: false, password: false });
    };

    const isFormInvalid = () => (!username || !password);

    const updateErrorFlags = () => {
        const errObj = { username: false, password: false };
        if (!username.trim()) errObj.username = true;
        if (!password.trim()) errObj.password = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <h2>Have an Account ?</h2>
            <h4>Login here</h4>
            <br />

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input noValidate id="email"
                        type="email"
                        name="username"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`form-control ${error.username ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input noValidate id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>

                <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#008080"}}>
                    Login | <i className="fas fa-sign-in-alt"></i>
                </button>
                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-times"></i>
                </button>
            </form>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (username, password, onSuccess, onError) => {
        dispatch(loginUser({ username, password }, onSuccess, onError))
    }

});
export default connect(null, mapDispatchToProps)(LoginForm);
