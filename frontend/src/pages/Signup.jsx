// /*eslint-disable*/
// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState({});

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (hasErrors()) return;

//     try {
//       const res = await axios.post("http://localhost:5000/api/signup", {
//         name,
//         email,
//         password,
//         confirmPassword: password,

//       });

//       Swal.fire({
//         icon: "success",
//         title: "Account Created",
//       });

//       setName("");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Signup Failed",
//         text: err.response?.data?.message || "Something went wrong",
//       });
//     }
//   };

//   const hasErrors = () => {
//     const errors = {};
//     if (!email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email";
//     if (password.length < 8) errors.password = "Password must be at least 8 characters";
//     setError(errors);
//     return Object.keys(errors).length > 0;
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Sign Up</h2>
//       <form onSubmit={submitHandler} className="border p-4 rounded shadow">

//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {error.email && <div className="text-danger">{error.email}</div>}
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error.password && <div className="text-danger">{error.password}</div>}
//         </div>

//         <button type="submit" className="btn btn-success w-100">Create Account</button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.mobile.match(/^[0-9]{10,15}$/)) {
      newErrors.mobile = "Invalid phone number";
    }
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.gender) newErrors.gender = "Please select a gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        text: "You will be redirected to our products page",
        timer: 2000,
        showConfirmButton: false
      });

      // Redirect to /products after successful signup
      navigate("/");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        gender: ""
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create Your Account</h2>
              
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. 0512345678"
                  />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password*</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Gender*</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating Account...
                    </>
                  ) : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
