import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Form.css";
import NavBar from "../components/NavBar";

function SignUp() {
  return (
    <>
      <NavBar />

      <div className="container app p-4">
        <div className="row align-items-center justify-content-center">
          <div className="form rounded-4 p-5 shadow">
            <h4 className="mb-5 display-6 fw-normal">Sign Up</h4>

            <div className="m-0 border-0">
              <form>
                <div className="mb-4 text-start">
                  <label htmlFor="username" className="text-left form-label">
                    First Name
                  </label>
                  <input
                    type="email"
                    className="form-control mt-2 tb-input rounded-3"
                    id="email"
                    required
                  />
                </div>

                <div className="mb-4 text-start">
                  <label htmlFor="username" className="text-left form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control mt-2 tb-input rounded-3"
                    id="email"
                    required
                  />
                </div>

                <div className="mb-4 text-start">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control mt-2 tb-input rounded-3"
                    id="password"
                    required
                  />
                </div>

                <Link to="#">
                  <button type="button" className="primary-pill fw-light">
                    Sign Up
                  </button>
                </Link>

                <p className="mt-4">
                  By continuing, you agree to the{" "}
                  <Link to="#">Terms of use</Link> and{" "}
                  <Link to="#">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
