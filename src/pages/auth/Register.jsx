import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebase";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // REGISTER
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 FULL NAME SET
      const fullName = `${firstName} ${lastName}`.trim();

      await updateProfile(user, {
        displayName: fullName || "Student",
        photoURL: null, // default fallback handled in navbar
      });

      // 📧 EMAIL VERIFICATION
      await sendEmailVerification(user);

      alert("Verification email sent 📩 Check your inbox");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {/* FIRST NAME */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        {/* LAST NAME */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
        />

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Register
        </button>
<p className="mt-6 text-center text-sm text-gray-600">
  Already have an account?{" "}
  <button
    onClick={() => navigate("/login")}
    className="font-semibold text-orange-500 hover:underline"
  >
    Login
  </button>
</p>
      </div>
    </div>
  );
}