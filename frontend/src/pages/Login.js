import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'
const Login = () =>{
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const {login,error:loginError,isLoading:loginLoading} = useLogin()
    const {signup,error:signupError,isLoading:signupLoading} = useSignup()
    const [isLogin,setIsLogin] = useState(true)
  
    const handleLogin =  async (e)=>{
        e.preventDefault()
        await login(email,password)
    }
    const handleSignup =  async (e)=>{
        e.preventDefault()
        
        await signup(email,password,name)
    }  
    const handleToggle = () => {
        setIsLogin(!isLogin)
    }
    return(
        // <form className='login-form' onSubmit={handleSubmit}>
        // <h3>Login</h3>

        // <label>Email: </label>
        // <input 
        //     type="email"
        //     onChange={(e) => setEmail(e.target.value)}
        //     value={email}
        //     className='login-input'
        // />

        // <label>Password: </label>
        // <input 
        //     type="password"
        //     onChange={(e) => setPassword(e.target.value)}
        //     value={password}
        //     className='login-input'
        // />

        // <button disabled={isLoading} className='login-button'>Log in</button>
        // {error && <div className='login-error'>{error}</div>}
        // </form>
        <div className="wrapper">
        <div className="card-switch">
            <label className="switch">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={!isLogin}
                    onChange={handleToggle}
                />
                <span className="slider"></span>
                <span className="card-side"></span>
                <div className="flip-card__inner">
                    {isLogin ? (
                        <div className="flip-card__front">
                            <div className="title">Log in</div>
                            <form action="" className="flip-card__form">
                                <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="flip-card__input"
                                />
                                <input
                                type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="flip-card__input"
                                    placeholder='Password'
                                />
                                <button className="flip-card__btn" onClick={handleLogin} disabled={loginLoading} >
                                    Let's go!
                                </button>
                                {loginError && <div className='login-error'>{loginError}</div>}
                            </form>
                        </div>
                    ) : (
                        <div className="flip-card__back">
                            <div className="title">Sign up</div>
                            <form action="" className="flip-card__form">
                                <input
                                    type="name"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="flip-card__input"
                                />
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Email"
                                    className="flip-card__input"
                                />
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="flip-card__input"
                                    placeholder='Password'
                                />
                                <button className="flip-card__btn" onClick={handleSignup}  disabled={signupLoading}>
                                    Confirm!
                                </button>
                                {signupError && <div className='login-error'>{signupError}</div>}

                            </form>
                        </div>
                    )}
                </div>
            </label>
        </div>
    </div>
    )
}

export default Login