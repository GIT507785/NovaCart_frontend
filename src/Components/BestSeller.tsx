import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestSeller: boolean;
}

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBestSeller = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/user/allproducts`
      );

      if (data.success) {
        const filteredProducts = data.items
          .filter((item: Product) => item.bestSeller === true)
          .slice(0, 8);
        setBestSeller(filteredProducts);
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
    fetchBestSeller();
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
    className="w-full px-3 sm:px-6 lg:px-10 mt-10 sm:mt-8 ">
      
      {/* Heading */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="font-medium text-2xl sm:text-3xl lg:text-4xl text-gray-500">
            Best{" "}
            <span className="font-bold text-slate-900">
              Seller
            </span>
          </h1>

          <span className="h-[2px] sm:h-1 w-7 sm:w-10 bg-slate-600"></span>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm text-center max-w-xl mt-3 px-2">
          Explore our most popular products loved by our customers.
        </p>
      </div>

      {/* Products */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-3
          sm:gap-5
          lg:gap-6
          py-10
          sm:mt-10
          max-w-7xl
          mx-auto
        "
      >
        {bestSeller.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-16 sm:py-20">
            <h2 className="text-base sm:text-xl font-bold text-gray-400 text-center">
              Best Seller Products Not Found 🙄
            </h2>
          </div>
        ) : (
          bestSeller.map((item) => (
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

                {/* Best Seller Badge */}
                <span
                  className="
                    absolute
                    top-2
                    left-2
                    sm:top-3
                    sm:left-3
                    bg-yellow-500
                    text-white
                    text-[9px]
                    sm:text-xs
                    font-semibold
                    px-2
                    sm:px-3
                    py-1
                    rounded-full
                  "
                >
                  Best Seller
                </span>

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

              {/* Content */}
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

                  <span className="text-[9px] sm:text-xs text-green-600 font-medium">
                    In Stock
                  </span>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="
                    mt-3
                    sm:mt-4
                    w-full
                    bg-black
                    text-white
                    py-1.5
                    sm:py-2.5
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
          ))
        )}
      </div>
    </motion.section>
  );
};

export default BestSeller;