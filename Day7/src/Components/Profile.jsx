import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Profile = () => {

    const user = useContext(UserContext);

  return (
    <div>
        <h1>Profile Page</h1>

        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Age: {user.age}</h2>
        <h2>College: {user.college}</h2>
    </div>
  )
}

export default Profile