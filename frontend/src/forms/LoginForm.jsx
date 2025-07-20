import { Link } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidator } from "../validators/auth.validator.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "./../store/user.slice.js";

const LoginForm = () => {
  console.log("[LoginForm] RENDERS...");

  const navigateTo = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginValidator.schema),
    defaultValues: LoginValidator.defaultValues,
  });

  const onError = (error) => console.log("Error: ", error);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setInvalidCredentials(true);
      }

      //Take the access_token the request replies
      const accessToken = response.headers.get("Authorization");
      //Set the access token and the email(on payload) took from the resquest's response in the store
      console.log("Access token dispatched to store...\n", accessToken);

      dispatch(login(accessToken));
      //Navigate to the home page
      navigateTo("/players");
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div
      id="loginForm"
      className="flex flex-col items-center justify-center w-[300px] rounded-md p-2 "
    >
      <header className="flex flex-col justify-center items-center">
        <h1 className="">Login</h1>
        <h3 className="">ASE Athletics Metrica</h3>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-y-2"
      >
        <div id="email" className="flex flex-col ">
          <label htmlFor="email">E-mail</label>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter e-mail"
            className="input"
          />
          {errors.email?.message && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-y-3 ">
          <label htmlFor="password" className="relative flex flex-col">
            Password
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="input"
            />
            <button
              className="absolute right-3 bottom-[17px] w-3 h-3 bg-accent-green"
              onMouseDown={() =>
                (document.getElementById("password").type = "text")
              }
              onMouseUp={() =>
                (document.getElementById("password").type = "password")
              }
              onMouseLeave={() =>
                (document.getElementById("password").type = "password")
              }
              type="button"
            ></button>
          </label>
          {errors.password?.message && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        {invalidCredentials && (
          <small className="text-red-500">
            This email and passsword combination is incorrect.
          </small>
        )}

        <button type="submit" className="btn-primary">
          Log in
        </button>
        <p className="text-sm text-center font-secondary">
          No account?{" "}
          <Link className="text-accent-green  font-semibold" to={"/signin"}>
            sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
