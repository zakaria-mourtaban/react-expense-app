import React from 'react';
import "../styles/acc.css"
const CreateAcc = () => { 
    return (
        <div className='container'>
            <h1>Login</h1>
            <form id="loginForm">
                <input type="text" id="loginUsername" placeholder="Username" required />
                <input type="password" id="loginPassword" placeholder="Password" required />
                <button type="submit">Login</button>
                <p id="loginMessage"></p>
            </form>

            <h1>Register</h1>
            <form id="registerForm">
                <input type="text" id="registerUsername" placeholder="Username" required />
                <input type="password" id="registerPassword" placeholder="Password" required />
                <button type="submit">Register</button>
                <p id="registerMessage"></p>
            </form>
        </div>
    );
}

export default CreateAcc