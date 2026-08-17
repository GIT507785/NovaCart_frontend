import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { LogOut, User, X, Search, Heart } from "lucide-react";
import React, {
  useContext,
  useState,
  type SetStateAction,
} from "react";
import { AppContext } from "../Context/AppContext";
import { PiPackageThin } from "react-icons/pi";

interface Props {
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}

const Navbar = ({ token, setToken }: Props) => {
  const { getCartCount } = useContext(AppContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const NavLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const NavLinksMobile = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },

    ...(token
      ? [
          { name: "My Orders", path: "/myorders" },
          { name: "Profile", path: "/myprofile" },
        ]
      : [{ name: "Login", path: "/login" }]),
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearch("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full px-3 sm:px-6 lg:px-10">
      <nav className="relative w-full max-w-[1600px] mx-auto mt-4 sm:mt-5 border-b border-gray-200">

        {/* ================= TOP NAVBAR ================= */}

        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-5">

          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <img
              src={assets.logo}
              className="
                w-20
                sm:w-24
                md:w-28
                lg:w-32
              "
              alt="NovaCart"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {NavLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  text-sm
                  lg:text-[15px]
                  font-medium
                  whitespace-nowrap
                  transition
                  ${
                    isActive
                      ? "text-black border-b-2 border-gray-700 pb-1"
                      : "text-gray-600 hover:text-black"
                  }
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

            {/* DESKTOP SEARCH */}
            <div className="hidden sm:block relative">
               
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setSearch("");
                }}
                className="
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-full
                  hover:bg-gray-100
                  transition
                "
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5 text-gray-700 cursor-pointer" />
                ) : (
                  <Search className="w-5 h-5 cursor-pointer text-gray-700" />
                )}
              </button>

              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="
                    absolute
                    right-0
                    top-10
                    z-[100]
                    w-[280px]
                    sm:w-[320px]
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    shadow-xl
                    p-2
                    flex
                    items-center
                    gap-2
                  "
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    placeholder="Search products..."
                    className="
                      flex-1
                      min-w-0
                      px-3
                      py-2
                      text-sm
                      outline-none
                    "
                  />

                  <button
                    type="submit"
                    className="
                      bg-black
                      text-white
                      px-3
                      sm:px-4
                      py-2
                      rounded-lg
                      text-xs
                      sm:text-sm
                      whitespace-nowrap
                      hover:bg-gray-800
                    "
                  >
                    Search
                  </button>
                </form>
              )}
            </div>

            {/* MOBILE SEARCH ICON */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="
                sm:hidden
                flex
                items-center
                justify-center
                w-8
                h-8
              "
            >
              {isSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
             
              {/* =================== */}

              <Link
               to="/wishlist"
               className="relative flex items-center justify-center"
               >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" /> 
              </Link>


              
            {/* USER DESKTOP */}
            {token ? (
              <div className="relative group hidden sm:block">

                <button
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    hover:bg-gray-100
                    transition
                  "
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>

                {/* USER DROPDOWN */}
                <div
                  className="
                    absolute
                    right-0
                    top-11
                    w-52
                    bg-white/95
                    backdrop-blur-xl
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-200
                    opacity-0
                    invisible
                    translate-y-2
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0
                    transition-all
                    duration-300
                    z-[100]
                    overflow-hidden
                  "
                >
                  <div className="p-2">

                    <Link
                      to="/myprofile"
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-gray-100
                      "
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        Profile
                      </span>
                    </Link>

                    <Link
                      to="/myorders"
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-gray-100
                      "
                    >
                      <PiPackageThin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        My Orders
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-red-50
                        text-left
                      "
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        Logout
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="
                  hidden
                  sm:block
                  bg-black
                  text-white
                  px-4
                  lg:px-5
                  py-2
                  rounded-full
                  text-xs
                  lg:text-sm
                  whitespace-nowrap
                  hover:bg-gray-800
                "
              >
                Login
              </Link>
            )}

            {/* CART */}
            <Link
              to="/cartitems"
              className="
                relative
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <img
                src={assets.cart_icon}
                className="
                  w-5
                  h-5
                  sm:w-6
                  sm:h-6
                "
                alt="Cart"
              />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  min-w-4
                  h-4
                  px-1
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-white
                  text-[9px]
                  sm:text-[10px]
                "
              >
                {getCartCount()}
              </span>
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
              }}
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-8
                h-8
                shrink-0
              "
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <img
                  src={assets.menu_icon}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  alt="Menu"
                />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        {isSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="
              sm:hidden
              w-full
              pb-3
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                items-center
                flex-1
                min-w-0
                border
                border-gray-200
                rounded-xl
                px-3
                bg-gray-50
              "
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Search products..."
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  outline-none
                  px-2
                  py-2.5
                  text-sm
                "
              />
            </div>

            <button
              type="submit"
              className="
                bg-black
                text-white
                px-4
                py-2.5
                rounded-xl
                text-xs
                shrink-0
              "
            >
              Search
            </button>
          </form>
        )}

        {/* ================= MOBILE MENU ================= */}

        {isMenuOpen && (
          <div
            className="
              md:hidden
              absolute
              top-full
              left-0
              right-0
              mt-2
              bg-white
              border
              border-gray-200
              rounded-2xl
              shadow-xl
              z-50
              overflow-hidden
            "
          >
            <div className="p-3">

              {NavLinksMobile.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                    block
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition
                    ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                    `
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Logout */}
              {token && (
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;