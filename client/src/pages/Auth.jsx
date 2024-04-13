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
  const { register, handleSubmit } = useForm();
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
      console.error(`Error ${isLogin ? "logging in" : "registering"}:`, error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input {...register("firstName")} id="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input {...register("lastName")} id="lastName" />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            {...register("password", { required: true })}
            id="password"
            type="password"
          />
        </div>
        <Button label={isLogin ? "Login" : "Register"} type="submit" />
      </form>
    </div>
  );
}
