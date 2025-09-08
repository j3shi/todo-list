import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser'
import { useState } from 'react'
import './Authentication.css'

export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({ authenticationMode }) {
  const { signUp, signIn } = useUser()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const credentials = { email, password }
      if (authenticationMode === AuthenticationMode.SignUp) {
        await signUp(credentials)
        navigate('/signin')
      } else {
        await signIn(credentials)
        navigate('/')
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || err.message)
    }
  }


  return (
    <div>
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}
        </button>

        <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}>
          {authenticationMode === AuthenticationMode.SignIn
            ? 'No account? Sign up'
            : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  )
}