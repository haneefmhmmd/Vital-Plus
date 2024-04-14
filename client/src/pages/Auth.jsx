import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Button from "../components/Button";
import { LOGIN_USER, REGISTER_USER } from "../config/apollo-client";
import { saveToLS } from "../utils/localStorage.util";
import useAuth from "../utils/useAuth";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login"; // Check if it's the login page
  const { user } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [mutateFunction] = useMutation(isLogin ? LOGIN_USER : REGISTER_USER);

  const onSubmit = async (data) => {
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      address,
      postalCode,
      country,
      image,
    } = data;
    try {
      const { data: responseData } = await mutateFunction({
        variables: isLogin
          ? { email, password }
          : {
              firstName,
              lastName,
              dateOfBirth,
              email,
              password,
              phoneNumber,
              address,
              postalCode,
              country,
              image,
            },
      });

      if (!isLogin) {
        navigate("/login");
      }

      if (isLogin && responseData && responseData.login) {
        user.entityId = responseData.login.entityId;
        user.userId = responseData.login.userId;
        user.roleId = responseData.login.roleId;
        user.email = responseData.login.email;
        user.token = responseData.login.token;
        saveToLS("user", user);
        navigateToDashboard();
      }
    } catch (error) {
      console.error(
        `Error ${isLogin ? "logging in" : "registering"}:`,
        error.message
      );
    }
  };

  const navigateToDashboard = (roleId) => {
    if (user.roleId == 1) {
      navigate("/nurse");
    } else if (user.roleId == 2) {
      console.log("Navigating...: ", user.roleId);
      navigate("/patient");
    }
  };

  return (
    <div className="auth">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              type="email"
              className="input"
            />
            {errors.email && (
              <p className="input-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="input-wrapper">
            <label className="input-label" htmlFor="password">
              Your Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password should have minimum of 3 character",
                },
              })}
              id="password"
              type="password"
              className="input"
            />
            {errors.password && (
              <p className="input-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          {!isLogin && (
            <>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="firstName"
                  className="input"
                />
                {errors.firstName && (
                  <p className="input-error" role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  id="lastName"
                  className="input"
                />
                {errors.lastName && (
                  <p className="input-error" role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                  })}
                  id="dateOfBirth"
                  type="date"
                  className="input"
                />
                {errors.dateOfBirth && (
                  <p className="input-error" role="alert">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  id="phoneNumber"
                  type="tel"
                  className="input"
                />
                {errors.phoneNumber && (
                  <p className="input-error" role="alert">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="address">
                  Address
                </label>
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  id="address"
                  type="text"
                  className="input"
                />
                {errors.address && (
                  <p className="input-error" role="alert">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  {...register("postalCode", {
                    required: "Postal Code is required",
                  })}
                  id="postalCode"
                  type="text"
                  className="input"
                />
                {errors.postalCode && (
                  <p className="input-error" role="alert">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="country">
                  Country
                </label>
                <input
                  {...register("country", {
                    required: "Country is required",
                  })}
                  id="country"
                  type="text"
                  className="input"
                />
                {errors.country && (
                  <p className="input-error" role="alert">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="image">
                  Profile Image
                </label>
                <input
                  {...register("image", {
                    required: "Profile Image is required",
                  })}
                  id="image"
                  type="url"
                  className="input"
                />
                {errors.image && (
                  <p className="input-error" role="alert">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </>
          )}

          <Button label={isLogin ? "Login" : "Register"} type="submit" />
        </form>
      </div>
    </div>
  );
}
