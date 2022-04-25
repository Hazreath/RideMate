import '../styles/Login.css'
import logo from '../assets/imgs/logo.png'
import background_video from '../assets/videos/ransley.mp4'
function Login() {
    let c =
    <div className='login-page'>
        {/* <div className='login-background'></div> */}
        <video autoPlay muted loop className='login-background'>
            <source src={background_video} type='video/mp4'></source>
        </video>
        <div className='login-page'>
            <img className='logo' src={logo} />
            
                <article class="message login-frame">
                    <div class="message-header">
                        <p>Login</p>
                        {/* <button class="delete" aria-label="delete"></button> */}
                    </div>
                    <div class="message-body">
                        {displayLoginForm()}
                    </div>
                </article>
            
        </div>
    </div>
        
        

    return c
}

function displayLoginForm() {
    return (
        <form className='login-form' method='POST'>
            <input type='text' className='input is-rounded' placeholder='Login'/>
            <input type='password' className='input is-rounded' placeholder='Password'/>
            <input type='submit' className='button is-rounded is-success' />
            <a href='#' className='register'>👉Register👈</a>
        </form>
    )
   
}

export default Login