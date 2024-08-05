import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { register, reset } from './features/auth/authSlice';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddUser from './components/AddUser';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
           <Route path="/admin/*" element={null} />
            
          </Routes>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<Profile/>} />

            {/* Admin Routes */}
              <Route path='/admin' element={<AdminDashboard/>}/>
              <Route path='/admin/login' element={<AdminLogin/>}/>
              <Route path='/admin/addUser' element={<AddUser/>}/>
          </Routes>
          
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
