import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}