/*eslint-disable*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (hasErrors()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
      });

      navigate("/");


      setEmail("");
      setPassword("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  const hasErrors = () => {
    const errors = {};
    if (!email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email";
    if (password.length < 8) errors.password = "Password must be at least 8 characters";
    setError(errors);
    return Object.keys(errors).length > 0;
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={submitHandler} className="border p-4 rounded shadow">

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error.password && <div className="text-danger">{error.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

