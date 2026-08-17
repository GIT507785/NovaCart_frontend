import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";


 interface  filteredProducts {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
  }[]
  
  const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState<filteredProducts[]>([]);
  const [loading , setloading] = useState(false)  
  const navigate = useNavigate()
  
  const fetchBestSeller = async ()=>{
    try {
        setloading(true)
       const {data} = await axios.get(`${VITE_BACKEND_URL}/api/user/allproducts` , {})

       if(data.success){
        const filteredproducts = data.items.filter((item:any)=> item.bestseller === true).slice(0,8)
        setBestSeller(filteredproducts)
      } else {
        toast.success(data.message)
      }
    } catch (error:any) {
      toast.error(error.message)
    } finally{
      setloading(false)
    }
  }

  useEffect(() => {       
  fetchBestSeller()
  }, []);

  
      if(loading){
        return(
          <div className="w-full h-full mx-auto flex items-center justify-center mt-30">
              <Loader className=" animate-spin  duration-1000 transition-all 
            size-10 text-gray-500"/>
            <h1 className="text-xl text-gray-500"> 
            Loading...</h1>
          </div>
        )
      }

  return (
    <div className="flex flex-col items-center mt-5 sm:mt-45">
      <div className="flex gap-2">
        <h1 className="font-medium text-xl sm:text-4xl text-gray-500">
          Best <span className="font-bold text-slate-900">Seller</span>
        </h1>
        <h1 className="bg-slate-600 h-0.5 sm:h-1 w-10 mt-3 sm:mt-5"></h1>
      </div>

      <h1 className="text-gray-500 text-xs px-2 sm:text-sm mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>

     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10 mt-14">
  {bestSeller.length === 0 ? (
    <div className="col-span-full flex justify-center items-center py-20">
      <h2 className="text-xl sm:text-xl font-bold text-gray-400">
        Best Seller Products Not Found 🙄
      </h2>
    </div>
  ) : (
    bestSeller.map((item) => (
      <div
        key={item._id}
        onClick={() => {
          navigate(`/product/${item._id}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Best Seller Badge */}
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Best Seller
          </span>

          {/* Price */}
          <span className="absolute bottom-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
            ${item.price}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
            {item.name}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <div className="flex text-yellow-400 text-sm">
              ⭐⭐⭐⭐⭐
            </div>

            <span className="text-xs text-green-600 font-medium">
              In Stock
            </span>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-4 w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default BestSeller;