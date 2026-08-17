import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  image: string[];
  price: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${VITE_BACKEND_URL}/api/user/allproducts`
        );

        if (data.success) {
          const filtered = data.items.filter((item: Product) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          );

          setProducts(filtered);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center gap-3">
        <Loader className="w-8 h-8 animate-spin text-gray-500" />
        <span className="text-gray-500">Searching...</span>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-8 lg:px-12 py-10">

      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Search Results
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        Results for:{" "}
        <span className="font-semibold text-black">
          "{query}"
        </span>
      </p>

      {products.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <h2 className="text-lg sm:text-xl text-gray-400">
            No products found 😕
          </h2>
        </div>
      ) : (
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
          sm:gap-6
          mt-10
        ">
          {products.map((item) => (
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
                cursor-pointer
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="
                    w-full
                    h-48
                    sm:h-56
                    lg:h-64
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-500
                  "
                />
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
                  {item.name}
                </h3>

                <p className="mt-2 font-semibold">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Search;