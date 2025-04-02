import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const userById = useSelector(state => state.userById.userById);
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h3>{userById.username}</h3>
        <h3>{userById.email}</h3>
        <h3>{userById.phone}</h3>
        <h3>{userById.address}</h3>
        </div>
    </div>
  )
}
