export default function Hamburger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative h-10 w-10 md:hidden"
      aria-label="Toggle menu"
    >
      <span
        className={`absolute left-2 top-3 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
          open ? "translate-y-[8px] rotate-45" : ""
        }`}
      />

      <span
        className={`absolute left-2 top-7 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
          open ? "-translate-y-[8px] -rotate-45" : ""
        }`}
      />
    </button>
  );
}