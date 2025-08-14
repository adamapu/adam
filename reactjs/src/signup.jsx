import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault(); 
    if (password !== confirmpassword) {
      alert("Password does not match");
      return;
    }

    axios.post("http://localhost:3001/signup", { name, email, password, age, gender })
      .then(result => {
        alert("Sign up successfully. Redirecting you back to log in page.");
        console.log(result);
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        alert("Gmail is already registered.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-35">
        <h2>Welcome to Register Page</h2>

        {/* FORM handles submit */}
        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-3"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-3"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && (
              <div style={{ color: "red", fontSize: "0.9rem" }}>{emailError}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-2" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="form-control rounded-3"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "gray"
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-2" style={{ position: "relative" }}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              id="confirmpassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="form-control rounded-3"
              required
              autoComplete="off"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "gray"
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
            {/* Age */}
            <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
                id="age"
                type="number"
                placeholder="Enter Age"
                className="form-control rounded-3"
                required
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            </div>

            {/* Gender */}
            <div className="mb-2">
            <label htmlFor="gender">Gender</label>
            <select
                id="gender"
                className="form-control rounded-3"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
            </select>
            </div>

          {/* Submit */}
          <div className="mb-2">
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
          </div>
          <div>
            <button type="button" className="btn btn-primary w-100 bg-primary" onClick={() => navigate("/")}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
