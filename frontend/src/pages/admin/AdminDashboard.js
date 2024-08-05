import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout,reset } from "../../features/adminAuth/adminAuthSlice"
import UsersList from "../../components/UsersList"

function AdminDashboard() {
    
    const navigate=useNavigate()
    const dispatch = useDispatch()
    // const { user } = useSelector((state) => state.auth)
    const { admin } = useSelector((state) => state.adminAuth)
    const onLogout = () => {

        dispatch(logout())
        dispatch(reset())
    }
    useEffect(() => {
        if (!admin) {
            navigate('/admin/login')
        }
    }, [admin, navigate])

  return (
    <div>
       <h1>Admin Dashboard</h1>
            <div style={{ width: '100%', display: "flex", justifyContent: "flex-end"}}>
            {/* <button className="btn" onClick={addUser}>Add User</button>&nbsp;
                <button className="btn" onClick={onLogout}>Logout</button> */}
                
            </div><br />

            <UsersList />
    </div>
  )
}

export default AdminDashboard
