import { useState } from "react";
import { menuData } from "../../data/menuData";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  onClose,
  user,
}) {
  const { darkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className={`fixed left-0 right-0 bottom-0 top-16 z-40 md:hidden transition-colors duration-300 ${
            darkMode ? "bg-[#111111]" : "bg-white"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-6 text-2xl font-semibold">

            {menuData
              .filter((item) => {
                if (!user && (item.title === "Dashboard" || item.title === "Blog")) {
                  return false;
                }
                return true;
              })
              .map((item, index) =>
                !item.children ? (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={onClose}
                    className={`transition hover:text-orange-500 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div key={index} className="text-center">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className={`transition hover:text-orange-500 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </button>

                    {openIndex === index && (
                      <div className="mt-3 flex flex-col gap-3 text-lg">
                        {item.children.map((child, i) => (
                          <Link
                            key={i}
                            to={child.path}
                            onClick={onClose}
                            className={`transition hover:text-orange-500 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}