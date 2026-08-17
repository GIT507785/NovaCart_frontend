import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import {
  Loader,
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext";

interface Product {
  name: string;
  image: string[];
  price: number;
  _id: string;
}

const Wishlist = () => {
  const navigate = useNavigate();

  const { token } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // ==========================================
  // FETCH WISHLIST
  // ==========================================

  const fetchWishlist = async () => {
    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/user/getwishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setWishlist(data.wishlist || []);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REMOVE FROM WISHLIST
  // ==========================================

  const removeFromWishlist = async (
    e: React.MouseEvent,
    productId: string
  ) => {
    e.stopPropagation();

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/user/removewishlist`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setWishlist((prev) =>
          prev.filter((item) => item._id !== productId)
        );

        toast.success("Removed from wishlist");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  // ==========================================
  // FETCH
  // ==========================================

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin text-gray-700" />
        </div>

        <p className="text-gray-500 text-sm">
          Loading your wishlist...
        </p>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!token) {
    return (
      <section className="min-h-[600px] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <Heart className="w-9 h-9 text-gray-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Login to view your wishlist
          </h1>

          <p className="text-gray-500 text-sm mt-3">
            Save your favorite products and access them
            anytime.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              text-sm
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlist.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          min-h-[600px]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center max-w-md">
          <div
            className="
              mx-auto
              w-24
              h-24
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              mb-6
            "
          >
            <Heart className="w-10 h-10 text-gray-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Wishlist is Empty
          </h1>

          <p className="text-gray-500 text-sm mt-3 leading-6">
            Looks like you haven't added anything to your
            wishlist yet. Explore our collection and save
            your favorite products.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              text-sm
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </motion.section>
    );
  }

  // ==========================================
  // WISHLIST UI
  // ==========================================

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full px-4 sm:px-6 lg:px-10 py-10 sm:py-14"
    >
      {/* HEADER */}

      <div className="max-w-7xl mx-auto mb-8 sm:mb-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />

              <span className="text-sm font-medium text-gray-500">
                Your Favorites
              </span>
            </div>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              My Wishlist
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>
          </div>

          <button
            onClick={() => navigate("/collection")}
            className="
              hidden
              sm:flex
              items-center
              gap-2
              border
              border-gray-200
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-medium
              hover:bg-gray-50
              transition
            "
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
          sm:gap-6
        "
      >
        {wishlist.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
            className="
              group
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-gray-100
                cursor-pointer
              "
              onClick={() => {
                navigate(`/product/${item._id}`);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* WISHLIST BADGE */}

              <div
                className="
                  absolute
                  top-3
                  left-3
                  flex
                  items-center
                  gap-1
                  bg-white/90
                  backdrop-blur
                  px-2.5
                  py-1.5
                  rounded-full
                  shadow-sm
                "
              >
                <Heart
                  className="
                    w-3.5
                    h-3.5
                    fill-red-500
                    text-red-500
                  "
                />

                <span className="text-[10px] font-medium text-gray-700">
                  Saved
                </span>
              </div>

              {/* PRICE */}

              <span
                className="
                  absolute
                  bottom-3
                  left-3
                  bg-black
                  text-white
                  text-xs
                  font-semibold
                  px-3
                  py-1.5
                  rounded-full
                "
              >
                ${item.price}
              </span>
            </div>

            {/* CONTENT */}

            <div className="p-3 sm:p-4">
              <h3
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
                className="
                  text-sm
                  sm:text-base
                  font-semibold
                  text-gray-900
                  line-clamp-2
                  min-h-[40px]
                  cursor-pointer
                  hover:text-gray-600
                  transition
                "
              >
                {item.name}
              </h3>

              {/* RATING */}

              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-400 text-xs">
                  ★★★★★
                </span>

                <span className="text-[10px] text-gray-400">
                  5.0
                </span>
              </div>

              {/* ACTIONS */}

              <div className="flex gap-2 mt-4">
                {/* REMOVE */}

                <button
                  onClick={(e) =>
                    removeFromWishlist(
                      e,
                      item._id
                    )
                  }
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    border
                    border-red-100
                    text-red-500
                    bg-red-50
                    hover:bg-red-500
                    hover:text-white
                    py-2
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-medium
                    transition-all
                    duration-200
                  "
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>

                {/* VIEW */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/product/${item._id}`
                    );

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    bg-black
                    text-white
                    hover:bg-gray-800
                    py-2
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-medium
                    transition
                  "
                >
                  View
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE SHOPPING BUTTON */}

      <div className="flex sm:hidden justify-center mt-8">
        <button
          onClick={() => navigate("/collection")}
          className="
            flex
            items-center
            gap-2
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            text-sm
            font-medium
          "
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>
    </motion.section>
  );
};

export default Wishlist;