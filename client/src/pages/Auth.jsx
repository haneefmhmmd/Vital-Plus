import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { LOGIN_USER, REGISTER_USER } from "../config/apollo-client";
import { saveToLS } from "../utils/localStorage.util";
import useAuth, { user } from "../utils/useAuth";

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
    const { email, password, firstName, lastName } = data;
    try {
      const { data: responseData } = await mutateFunction({
        variables: isLogin
          ? { email, password }
          : { firstName, lastName, email, password },
      });

      if (!isLogin) {
        navigate("/login");
      }

      if (isLogin && responseData && responseData.login) {
        user.userId = responseData.login.userId;
        user.roleId = responseData.login.roleId;
        user.email = responseData.login.email;
        user.token = responseData.login.token;
        saveToLS("user", user);
        navigate("/app");
      }
    } catch (error) {
      console.error(
        `Error ${isLogin ? "logging in" : "registering"}:`,
        error.message
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          </>
        )}
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
        <Button label={isLogin ? "Login" : "Register"} type="submit" />
      </form>
    </div>
  );
}
