import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);


    const handleSubmit = (event) => {

        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(email, password, confirmPassword)

        if (password.length < 6) {
            setError('Password must be 6 characters or more');
            return;

        }
        if (password !== confirmPassword) {
            setError('Your password did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Please SignIn</h1>
            <form onSubmit={handleSubmit} className='form-head'>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="password" name="confirmPassword" required />
                </div>
                <p className='error'>{error}</p>
                <div className='btn-submit'>
                    <button className='btn'>Sign Up</button>
                </div>
            </form>
            <p>Already have an account <Link to={'/login'}>..login</Link> </p>
        </div>
    );
};

export default SignUp;