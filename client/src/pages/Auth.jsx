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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
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
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                id="firstName"
              />
              {errors.firstName && (
                <p role="alert">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName", {
                  required: "First name is required",
                })}
                id="lastName"
              />
              {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                id="dateOfBirth"
                type="date"
              />
              {errors.dateOfBirth && (
                <p role="alert">{errors.dateOfBirth.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                id="phoneNumber"
                type="tel"
              />
              {errors.phoneNumber && (
                <p role="alert">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                {...register("address", { required: "Address is required" })}
                id="address"
                type="text"
              />
              {errors.address && <p role="alert">{errors.address.message}</p>}
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                {...register("postalCode", {
                  required: "Postal Code is required",
                })}
                id="postalCode"
                type="text"
              />
              {errors.postalCode && (
                <p role="alert">{errors.postalCode.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                {...register("country", { required: "Country is required" })}
                id="country"
                type="text"
              />
              {errors.country && <p role="alert">{errors.country.message}</p>}
            </div>
            <div>
              <label htmlFor="image">Profile Image</label>
              <input
                {...register("image", {
                  required: "Profile Image is required",
                })}
                id="image"
                type="url"
              />
              {errors.image && <p role="alert">{errors.image.message}</p>}
            </div>
          </>
        )}

        <Button label={isLogin ? "Login" : "Register"} type="submit" />
      </form>
    </div>
  );
}
