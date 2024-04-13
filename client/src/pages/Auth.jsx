import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { REGISTER_USER } from "../config/apollo-client";
export default function Auth() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [registerMutateFunction, { data, loading, error }] =
    useMutation(REGISTER_USER);

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password } = data;

    try {
      const { data } = await registerMutateFunction({
        variables: { firstName, lastName, email, password },
      });

      if (data && data.registerMutateFunction) {
        history.push("/app");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", { required: true })}
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName", { required: true })} id="lastName" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} id="email" />
        </div>

        <div>
          <label htmlFor="password">Your Password</label>
          <input {...register("password", { required: true })} id="password" />
        </div>
        <Button label="Register" />
      </form>
    </div>
  );
}
