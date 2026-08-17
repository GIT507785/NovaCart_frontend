import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import { Heart, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext";

interface Product {
  name: string;
  image: string[];
  price: number;
  _id: string;
}

const LatestCollections = () => {
  const navigate = useNavigate();
  const {addToWishlist} = useContext(AppContext)

   

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/user/allproducts`
      );

      if (data.success) {
        setProducts(data.items);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] w-full flex flex-col items-center justify-center gap-3">
        <Loader className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-gray-500" />

        <h1 className="text-sm sm:text-xl text-gray-500">
          Loading...
        </h1>
      </div>
    );
  }

  return (
   <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="w-full px-3 sm:px-6 lg:px-10 mt-8 sm:mt-14"
>
      
      {/* Section Heading */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="font-medium text-2xl sm:text-3xl lg:text-4xl text-gray-500">
            Latest{" "}
            <span className="font-bold text-slate-900">
              Collections
            </span>
          </h1>

          <span className="h-[2px] sm:h-1 w-7 sm:w-10 bg-slate-600"></span>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm text-center max-w-xl mt-3 px-2">
          Discover our latest collection of premium products,
          carefully selected for you.
        </p>
      </div>

      {/* Products Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-3
          sm:gap-5
          lg:gap-6
          mt-8
          sm:mt-10
          max-w-7xl
          mx-auto
        "
      >
        {products.slice(0, 12).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/product/${item._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
              group
              cursor-pointer
              bg-white
              rounded-xl
              sm:rounded-2xl
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              sm:hover:-translate-y-2
            "
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={item.image[0]}
                alt={item.name}
                className="
                  w-full
                  h-44
                  sm:h-56
                  md:h-64
                  lg:h-72
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* Wishlist */}
              <button
                onClick={(e) => {e.stopPropagation(); addToWishlist(item._id)}}
                className="
                  absolute top-2
                  right-2  sm:top-3
                  sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full  bg-white/90 backdrop-blur
                   flex items-center justify-center cursor-pointer shadow-md  hover:bg-white transition
                     text-sm  sm:text-base
                "
              >
                <Heart className="fill-red-700"/>
              </button>

              {/* Price */}
              <span
                className="
                  absolute
                  bottom-2
                  left-2
                  sm:bottom-3
                  sm:left-3
                  bg-black
                  text-white
                  text-[10px]
                  sm:text-xs
                  px-2
                  sm:px-3
                  py-1
                  rounded-full
                "
              >
                ${item.price}
              </span>
            </div>

            {/* Product Content */}
            <div className="p-2.5 sm:p-4">
              <h3
                className="
                  text-xs
                  sm:text-sm
                  lg:text-base
                  font-semibold
                  text-gray-800
                  line-clamp-2
                  min-h-[32px]
                  sm:min-h-[40px]
                "
              >
                {item.name}
              </h3>

              {/* Rating + Stock */}
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <div className="text-yellow-400 text-[10px] sm:text-sm">
                  ⭐⭐⭐⭐⭐
                </div>

                <span className="text-[9px] sm:text-xs text-gray-500">
                  In Stock
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="
                  mt-3
                  sm:mt-4
                  w-full
                  bg-black
                  text-white
                  py-1.5
                  sm:py-2
                  rounded-lg
                  sm:rounded-xl
                  text-xs
                  sm:text-sm
                  hover:bg-gray-800
                  transition
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default LatestCollections;