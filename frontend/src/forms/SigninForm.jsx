import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SigninValidator } from "./../validators/auth.validator.js";

const Signin = () => {
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
      const response = await fetch("http://localhost:3000/api/auth/register", {
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

      if (!response.ok) throw new Error("No response");

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
    <div id="login" className="flex flex-col items-center justify-center">
      <header className="flex flex-col justify-center items-center">
        <h1 className="">Sign in</h1>
        <h3 className="">ASE Athletics Metrica</h3>
      </header>
      {signed ? (
        <h1>Successfully signed in!</h1>
      ) : (
        <FormProvider>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-y-2 "
          >
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
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="text"
              name="password"
              placeholder="Enter password"
              className="input"
            />
            {errors.password?.message && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
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
