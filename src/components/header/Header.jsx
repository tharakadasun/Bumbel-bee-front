import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";

import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout, logoutUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

function isTokenExpired(token) {
  const decodedToken = jwt_decode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();
  return expirationTime < currentTime;
}
function Header({userLogin,setUserLogin}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogourHandler = () =>{
    dispatch(logoutUser);
    localStorage.clear();
    navigate("/")
    setUserLogin(false);
  }
  const [user, setUser] = useState("");
  useEffect(() => {
    const token_local = localStorage.getItem("token");
    const user_local = localStorage.getItem("user");
    if(user_local != null){
      setUser(user_local);
    }
    if(token_local != null){
      if (isTokenExpired(token_local)) {
        localStorage.clear();
        setUserLogin(false);
      } else {
        setUserLogin(true)
      }
    }
  },[]);
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"rgb(44 109 168)"}}>
        <div className="container">
          <a href="/" className="navbar-brand" style={{color:"white"}}>Shopping Center</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <form className="d-flex w-100 justify-content-end" role="search">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userLogin ? <>{user? <>{user}</>:<>NaN</>}</>:<BiUserCircle />}
                </button>
                <ul className="dropdown-menu">
                  {userLogin ? (
                    <>
                      <a className="dropdown-item" onClick={handleLogourHandler}>
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <li>
                        <a className="dropdown-item" href="/sign-in">
                          SignIn
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/sign-up">
                          SignUp
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
