import { useSelector, useDispatch } from 'react-redux';
import { logout as userLogout, reset as userReset } from '../features/auth/authSlice';
import { logout as adminLogout, reset as adminReset } from '../features/adminAuth/adminAuthSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Accessing user and admin data from state
    const { user } = useSelector((state) => state.auth);
    const { admin } = useSelector((state) => state.adminAuth);

    const onLogout = () => {
        if (admin) {
            dispatch(adminLogout());
            dispatch(adminReset());
            navigate('/admin/login');
        } else if (user) {
            dispatch(userLogout());
            dispatch(userReset());
            navigate('/');
        }
    };

    return (
        <header className='header'>
            <div className="logo">
                {/* Dynamic Link based on admin status */}
                <Link to={admin ? "/admin" : "/"}>
                    REDUX
                </Link>
            </div>
            <ul>
                {(user || admin) ? (
                    <>
    
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/login">
                                <FaSignInAlt /> Admin
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
