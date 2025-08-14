import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch existing data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
        setGender(res.data.gender);
        setPassword(res.data.password);
        setConfirmPassword(res.data.password);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching profile.");
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate password match
    if (password.trim() && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios.put(`http://localhost:3001/users/${id}`, {
        name,
        age,
        gender,
        password: password.trim() !== "" ? password : undefined,
      })
      .then((res) => {
        alert("Profile updated successfully!");
        navigate(`/tasks/${id}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-35">
        <h2>Edit Profile</h2>
        <form onSubmit={handleUpdate}>
          {/* Name */}
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email (read-only) */}
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              disabled
            />
          </div>

          {/* Age */}
          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              className="form-control rounded-3"
              value={age}
              min="1"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-2">
            <label>Gender</label>
            <select
              className="form-control rounded-3"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* New Password */}
          <div className="mb-2" style={{ position: "relative" }}>
            <label>New Password (optional)</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-3"
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
                color: "gray",
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-2" style={{ position: "relative" }}>
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control rounded-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "gray",
              }}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </span>
          </div>

          {/* Buttons */}
          <div className="mb-2">
            <button type="submit" className="btn btn-success w-100">
              Save Changes
            </button>
          </div>
          <div className="mb-2">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
