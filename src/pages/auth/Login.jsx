import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // EMAIL LOGIN
  const handleLogin = async () => {
    try {
      const res = await loginWithEmail(email, password);

      const user = res.user;

      // 🔥 EMAIL VERIFICATION CHECK
      if (!user.emailVerified) {
        alert("Please verify your email first 📩");
        return;
      }

      alert("Login Successful ✅");
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    try {
      const res = await loginWithGoogle();

      const user = res.user;

      // optional safety check
      if (!user) {
        alert("Login failed ❌");
        return;
      }

      alert("Google Login Successful ✅");
     navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Chitro Academy
        </h2>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogle}
          className="w-full mb-4 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Continue with Google
        </button>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Login
        </button>
<p className="mt-6 text-center text-sm text-gray-600">
  Don't have an account?{" "}
  <button
    onClick={() => navigate("/register")}
    className="font-semibold text-orange-500 hover:underline"
  >
    Create Account
  </button>
</p>
      </div>
    </div>
  );
}