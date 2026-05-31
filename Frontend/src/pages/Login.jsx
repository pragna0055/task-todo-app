import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-teal-100 p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Manage Your <br /> Tasks Easily
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Organize, track and complete your tasks efficiently.
          </p>

          <button className="mt-8 bg-indigo-900 text-white px-8 py-3 rounded-full w-fit font-semibold">
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="p-12 flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md"
          >
            <h2 className="text-4xl font-bold text-center mb-2">
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 mb-8">
              Login to your account
            </p>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-900 text-white p-4 rounded-xl font-semibold hover:bg-indigo-800"
            >
              Login
            </button>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-700 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;