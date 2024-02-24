import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
const Signup = () =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {signup,isLoading,error} = useSignup()
    const handleSubmit =  async (e)=>{
        e.preventDefault()
        await signup(email,password)
    } 
    return(
        <form className='login-form' onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Email: </label>
        <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='login-input'
        />

        <label>Password: </label>
        <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='login-input'
        />

        <button disabled={isLoading} className='login-button'>Log in</button>
        {error && <div className='login-error'>{error}</div>}
        </form>
    )
}

export default Signup 