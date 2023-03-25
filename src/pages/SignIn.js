import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signInUser, addToken } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function isTokenExpired(token) {
  const decodedToken = jwt_decode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();
  return expirationTime < currentTime;
}

function SignIn() {
  const dispatch = useDispatch();
  const { error, loading, user, loginSuccess, token, status } = useSelector(
    (state) => state.user
  );

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  if(status){
    navigate("/")
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(userCredentials));
    setIsSubmit(true);
  };
  useEffect(() => {
    const token_local = localStorage.getItem("token");
    if (token_local != null) {
      if (isTokenExpired(token_local)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        navigate("/");
      }
    }

    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(signInUser(userCredentials));
      
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password must be more than 3 characters";
    }
    return errors;
  };
  return (
    <>
      <section className="hv-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-3">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={handleOnChange}
                      name="email"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    <p className="text-danger">{formErrors.email}</p>
                    {error ? (
                      <span className="text-danger">
                        Please check your email address
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={handleOnChange}
                      name="password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <p className="text-danger">{formErrors.password}</p>
                    {error ? (
                      <span className="text-danger">
                        Please check your password address
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="form-check d-flex justify-content-start mt-4 mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label
                      className="form-check-label px-2"
                      htmlFor="form1Example3"
                    >
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={submitHandler}
                  >
                    SignIn
                  </button>

                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
