import { useDispatch } from "react-redux";
import { login } from "./../store/user.slice.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import LoginForm from "../forms/LoginForm.jsx";
import { API_URL } from "../config/config.js";

const Login = () => {
  const URL = API_URL
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auto_log = async () => {
      try {
        const response = await fetch(`${URL}/auth/login`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) throw new Error("Error fetching in auto_log"); //this means that pwd and email dont match or invalid
        //Take the access_token the request replies
        const access_token = response.headers.get("Authorization");
        //Take the refresh_token
        console.log("autolog", access_token);
        //Set the access token and the email(on payload) took from the resquest's response in the store
        if (access_token) dispatch(login(access_token));
        //Navigate to the home page
        navigateTo("/home");
      } catch (error) {
        console.log(error);
      }
    };

    auto_log();
  }, []);

  return (
    <div className="flex w-full h-[100vh] flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;
