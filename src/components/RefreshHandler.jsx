 import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token")
        if (token) {
            try {
                const { exp } = jwtDecode(token)//decode expiry of jwt
                const isExpired = Date.now() >= exp * 1000//if current time >= jwt token expiry time
                
                 if (isExpired) {
                     //expired token to logout by removing token 
                     localStorage.removeItem('token');
                     setIsAuthenticated(false);
                     navigate('/login', { replace: true });

                 }
                 else {
                     setIsAuthenticated(true);
                     if (location.pathname === "/" ||
                         location.pathname === "/login" ||
                         location.pathname==="/signup"
                     ) {
                         navigate('/home', { replace: true });
                    }
                }
       
            }
            catch (e) {
                //invalid token == logout
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/login',{replace:true})
            }
           
        } else {
            setIsAuthenticated(false)
            if (location.pathname === '/home') {
                navigate("/login",{replace:true})
            }
        }
    }, [location, navigate, setIsAuthenticated])
    return null;
}

export default RefrshHandler