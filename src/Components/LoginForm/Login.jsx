import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';


import './Login.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (event) =>{
        debugger
        if (username === 'pavan' && password === 'pavan') {
            debugger
            login(); // Update authentication state
            navigate('/dashboard');
        }
        console.log("UserName : ",username);
        console.log("Password : ",password);
        //navigate('/dashboard')

        console.log(event)
    }
    return (
        <div className="Main-Container ">
            <div className="Card-Container" >
                <div >
                    <div className='mb-3'>
                        <h1>Login To Analogics</h1>
                    </div>
                    <div className='mb-3' style={{order:2}}>
                    <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}

                />
                    </div>
                    
                    <div className='mb-3' style={{order:1}}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    />

                    </div>
                    
                    <div className='mb-3 d-flex justify-content-center' text-center>
                    <button  type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        PROCEED
                    </button>

                    </div>
                    
                </div>

            </div>

        </div>

    );

}
export default Login;