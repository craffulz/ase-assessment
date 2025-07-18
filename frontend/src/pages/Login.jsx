import { useDispatch } from "react-redux";
import { login } from "./../store/user.slice.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auto_log = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        if (!response) throw new Error("Error fetching in auto_log"); //this means that pwd and email dont match or invalid

        //Take the access_token the request replies
        const access_token = response.headers.get("Authorization");
        //Take the refresh_token
        console.log("autolog", access_token);
        //Set the access token and the email(on payload) took from the resquest's response in the store
        dispatch(login(access_token));
        //Add access_token to session_storage
        sessionStorage.setItem("access_token", access_token);
        //Navigate to the home page
        navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    };

    auto_log();
  }, []);

  return <LoginForm />;
};

export default Login;
