import { FormEvent } from "react";
import Button from "../component/button";
import Input from "../component/input";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

    try {
      const response = await axios(`${BASE_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: formValues,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log(response);
      toast.success("welcome");
    } catch (err) {
      console.log(err);
      toast.error("invalid error");
    }
  };

  // test@gmaill.com - test123

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="username" type="text" id="username" content="Username" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          <Button content="Login" type="submit" className="bg-blue-600" />
        </form>
        <p>
          Don't have an account
          <NavLink className="text-blue-400 ml-1 hover:underline" to="/register">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
