import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { LOGIN_USER, REGISTER_USER } from "../config/apollo-client";

import { saveToLS } from "../utils/localStorage.util";

export default function Auth() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [registerMutateFunction] = useMutation(REGISTER_USER);

  const [loginMutateFunction] = useMutation(LOGIN_USER);

  const onRegister = async (data) => {
    const { firstName, lastName, email, password } = data;

    try {
      const { registerData } = await registerMutateFunction({
        variables: { firstName, lastName, email, password },
      });

      if (registerData) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const onLogin = async (data) => {
    console.log("Logging in...", data);
    const { email, password } = data;

    try {
      const { data: responseData } = await loginMutateFunction({
        variables: { email, password },
      });

      if (responseData && responseData.login) {
        saveToLS("token", responseData.login.token);
        navigate("/app");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName")} id="lastName" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} id="email" />
        </div>

        <div>
          <label htmlFor="password">Your Password</label>
          <input {...register("password", { required: true })} id="password" />
        </div>
        <Button label="Register" onClick={handleSubmit(onRegister)} />
        <Button label="Login" onClick={handleSubmit(onLogin)} />
      </form>
    </div>
  );
}
