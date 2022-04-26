import '../styles/Login.css'
import logo from '../assets/imgs/logo.png'
import background_video from '../assets/videos/ransley.mp4'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const axios = require('axios').default


function Login() {
    const navigate = useNavigate()
    let c =
    <div className='login-page'>
        {/* <div className='login-background'></div> */}
        <video autoPlay muted loop className='login-background'>
            <source src={background_video + '#t=23'} type='video/mp4'></source>
        </video>
        <div className='login-page'>
            <img className='logo' src={logo} />
            
                <article className="message login-frame">
                    <div className="message-header">
                        <p>Login</p>
                        {/* <button class="delete" aria-label="delete"></button> */}
                    </div>
                    <div className="message-body">
                        {displayLoginForm(navigate)}
                    </div>
                </article>
            
        </div>
    </div>
        
        

    return c
}

function displayLoginForm(navigate) {
    
    return (
        <form className='login-form' method='POST' onSubmit={(e) => login(e,navigate)}>
            <input type='text' className='input is-rounded' placeholder='Login' name='username' value='Benji'/>
            <input type='password' className='input is-rounded' placeholder='Password' name='password' value='Benji'/>
            <input type='submit' className='button is-rounded is-success' />
            <a href='#' className='register'>👉Register👈</a>
            {/* <Link to='/tricklist'>tricklist</Link> */}
        </form>
    )
   
}

function login(e, navigate) {
    e.preventDefault()
    
    let formData = new FormData(e.target)
    let username = formData.get('username')
    let password = formData.get('password')
    console.log('Logging in with: ' + username + '/' + password)
    axios.post('http://127.0.0.1:3001/api/users/login', {
        params: {
            username: username,
            password: password
        }
    }).then(function(res) {
        console.log("ok: " + res.data.message)
        // Redirect to Tricklist
        navigate('/tricklist')

    })
    .catch(function(err) {
        console.log("err: " + err.response.data.error)
    })
        
}

export default Login