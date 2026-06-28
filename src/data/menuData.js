export const menuData = [
  {
    title: "Home",
    path: "/",
  },
  {
  title: "Dashboard",
  path: "/dashboard",
},
  {
    title: "Courses",
    children: [
      { title: "Free Courses", path: "/courses/free" },
      { title: "Paid Courses", path: "/courses/paid" },
    ],
  },

  {
    title: "Artwork",
    path: "/artwork",
  },
  {
    title: "Exhibition",
    path: "/exhibition",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Help",
    path: "/help",
  },
  {
    title: "Policies",
    children: [
      { title: "Terms & Conditions", path: "/policies/terms" },
      { title: "Privacy Policy", path: "/policies/privacy" },
      { title: "Disclaimer", path: "/policies/disclaimer" },
      { title: "Refund Policy", path: "/policies/refund" },
    ],
  },
];
