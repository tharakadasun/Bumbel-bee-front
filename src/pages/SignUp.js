import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../redux/auth/authSlice";

import jwt_decode from "jwt-decode";

function isTokenExpired(token) {
  const decodedToken = jwt_decode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();
  return expirationTime < currentTime;
}

function SignUp() {
  const dispatch = useDispatch();
  const {error,loading,user,loginSuccess,token} = useSelector(state=>state.user);
 
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const initial = {"firstName":"","lastName":"","email":"","password":"","dob":"","role":"user"};
  const[userFormDetails, setUserFormDetails]= useState(initial)
  const navigate = useNavigate();

  const handleOnChange = (e) =>{
    console.log(e);
    setUserFormDetails({...userFormDetails,[e.target.name]:e.target.value})
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    setFormErrors(validate(userFormDetails));
    setIsSubmit(true);
  }
  console.log(userFormDetails);
  useEffect(() => {
    const token_local = localStorage.getItem("token");
    if(token_local != null){
      if (isTokenExpired(token_local)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        navigate("/")
      }
    }
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(signUpUser(userFormDetails));
      navigate("/");
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.firstName){
      errors.firstName = "First Name is required";
    }
    if(!values.lastName){
      errors.lastName = "Last Name is required"
    }
    if(!values.dob){
      errors.dob = "Date of Birth is required"
    }
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
      <section className="">
        <div
          className="px-4 py-5 px-md-5 text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Shopping <br />
                  <span className="text-primary">Center</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingFirstName"
                              placeholder="First Name"
                              onChange={handleOnChange}
                              name="firstName"
                            />
                            <label htmlFor="floatingFirstName">
                              First Name
                            </label>
                            <p className="text-danger">{formErrors.firstName}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingLastName"
                              placeholder="Last Name"
                              onChange={handleOnChange}
                              name="lastName"
                            />
                            <label htmlFor="floatingLastName">
                              Last Name
                            </label>
                            <p className="text-danger">{formErrors.lastName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingEmail"
                          placeholder="Email"
                          onChange={handleOnChange}
                          name="email"
                        />
                        <label htmlFor="floatingPassword">Email</label>
                        <p className="text-danger">{formErrors.email}</p>
                      </div>

                      <div className="form-floating mb-3">
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
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="floatingDob"
                          placeholder="Date of Birth"
                          onChange={handleOnChange}
                          name="dob"
                        />
                        <label htmlFor="floatingPassword">Date of Birth</label>
                        <p className="text-danger">{formErrors.dob}</p>
                        {error ? <span className="text-danger">Please check your information!</span>:<></>}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        onClick={submitHandler}
                      >
                        Sign up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
