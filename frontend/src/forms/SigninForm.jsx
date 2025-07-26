import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SigninValidator } from "./../validators/auth.validator.js";
import { API_URL } from "../config/config.js";

const Signin = () => {
  const URL = API_URL;
  const [signed, setSigned] = useState(false);
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(SigninValidator.schema),
    defaultValues: SigninValidator.defaultValues,
  });

  const onError = (error) => console.log("Error: ", error);

  const onSubmit = async (data) => {
    console.log("Executing onSubmit... \nSignin data retrieved-> \n", data);
    const { name, email, password } = data;

    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("No response");
      }

      setSigned(true);
      setTimeout(() => {
        navigateTo("/");
      }, 700);

      console.log(response);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div
      id="login"
      className="flex flex-col items-center justify-center text-neutral-100"
    >
      <header className="flex flex-col justify-center items-center">
        <h1 className="">Sign in</h1>
        <h3 className="">ASE Athletics Metrica</h3>
      </header>
      {signed ? (
        <h1 className="text-green-500">Successfully signed in!</h1>
      ) : (
        <FormProvider>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-y-8 text-neutral-100"
          >
            <div className="relative">
              <label>Name</label>
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Enter name"
                className="input"
              />
              {errors.name?.message && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="relative">
              <label>E-mail</label>
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder="Enter e-mail"
                className="input"
              />
              {errors.email?.message && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="text"
                name="password"
                placeholder="Enter password"
                className="input"
              />
              {errors.password?.message && (
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              )}
            </div>
            <button type="submit" className="btn-primary">
              Sign in
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default Signin;
