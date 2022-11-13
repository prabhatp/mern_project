import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
            <img className='logo' src="https://yt3.ggpht.com/ytc/AMLnZu907ujnXt1ae1wVUDH8NrYtoLeeI5XCK7OsMU3HCw=s900-c-k-c0x00ffffff-no-rj" />
            <ul className='nav-ul nav-right'>
                { auth ?  
                <>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li> 
                </>
                :  
                <>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>  
            }
            </ul>
        </div>
    )
}

export default Nav;