import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import styles from './Dashboard.module.css'; 


function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
 
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);
  useEffect(() => {
    console.log('User:', user);  // Check what you have as user data
    if (!user) {
      console.log('Redirecting to login because user is not present.');
      navigate('/login');
    }
  }, [user, navigate]);
  

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      { user ? (
        <div className={styles.userInfo}>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>Loading user data....</p>
      )}
      <Link to="/profile" className={styles.linkToProfile}>Go to Profile</Link>

      
    </div>
  );
}

export default Dashboard;
