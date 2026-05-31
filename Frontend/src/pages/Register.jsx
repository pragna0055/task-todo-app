import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/");
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
            Start Managing <br /> Your Tasks
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Create an account and organize your work efficiently.
          </p>

          <button className="mt-8 bg-indigo-900 text-white px-8 py-3 rounded-full w-fit font-semibold">
            Join Now
          </button>
        </div>

        {/* Right Section */}
        <div className="p-12 flex items-center justify-center">
          <form
            onSubmit={handleRegister}
            className="w-full max-w-md"
          >
            <h2 className="text-4xl font-bold text-center mb-2">
              Create Account
            </h2>

            <p className="text-center text-gray-500 mb-8">
              Join and manage your tasks easily
            </p>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              Register
            </button>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-indigo-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;