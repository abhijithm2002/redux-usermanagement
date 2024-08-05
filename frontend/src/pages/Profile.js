import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDet from '../components/profile/ProfileDet'

function Profile() {
  const { user } = useSelector((state) => state.auth);
  console.log(" ondo" , user)
  return (
    <div>
    {user && <ProfileDet userData= {user}/>}
    </div>
  )
}

export default Profile

