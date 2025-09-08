import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export default function UserProvider({ children }) {
  const userFromStorage = sessionStorage.getItem('user')
  const [user, setUser] = useState(
    userFromStorage ? JSON.parse(userFromStorage) : null
  )

  const signUp = async ({ email, password }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data
  }

  const signIn = async ({ email, password }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signin`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    setUser(response.data)
    sessionStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  )
}
