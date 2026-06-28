import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">

        <img
          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold">
          Welcome, {user.displayName || "Student"}
        </h2>

        <p className="text-gray-600 mt-2">{user.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}