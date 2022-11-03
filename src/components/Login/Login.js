import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'



const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';



    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => console.error(error))
    }




    //----------------------
    return (
        <div className='form-container'>
            <h1 className='form-title'>Please login</h1>
            <form onSubmit={handleLogin} className='form-head'>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className='btn-submit'>
                    <button className='btn'>Login</button>
                </div>
            </form>
            <p>New to ema john <Link to={'/signup'}>Create a new account </Link> </p>
        </div>
    );
};

export default Login;