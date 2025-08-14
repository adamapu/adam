import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Live email validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

const handleLogin = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/login", { name, email, password })
    .then((result) => {
      if (result.data.message === "Success") {
        alert("Login Successfully.");
        navigate(`/tasks/${result.data.id}`);
      } else {
        alert(result.data);
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("An error occurred during login. Please try again.");
    });
};


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Welcome</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              autoComplete="on"
              name="name"
              required
              className="form-control rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              autoComplete="on"
              name="email"
              required
              className="form-control rounded-3"
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
          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-3"
              required
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
                color: "#888",
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20}/>}
            </span>
          </div>
        {/* Login Button */}
        <button
          type="submit"
          className="btn btn-success w-100 rounded-0"
          
        >
          Log In
        </button>
        </form>
        <p></p>
        <Link to="/signup">Haven't created an account? Click here to sign up!</Link>
      </div>
    </div>
  );
}

export default Login;
