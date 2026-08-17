import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { VITE_BACKEND_URL } from "../API/api"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"

 interface products {
  name:string,
  image:string,
  price:number
  _id:string
 }

const LatestCollections = () => {
  

   const navigate = useNavigate()
   const[loading , setloading  ]  = useState(false)

    const [products , setProducts] = useState<products[]>([])
  
     const fetchProducts = async () =>{
      try {
         setloading(true)
         const {data} = await axios.get(`${VITE_BACKEND_URL}/api/user/allproducts` , {})
         if(data.success){
          setProducts(data.items)
         } else {
          toast.error(data.message)
         }
      } catch (error:any) {
        toast.error(error.message)
      } finally{
        setloading(false)
      }
     }

     useEffect(()=>{
      fetchProducts()
     },[])
  
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
    <div className="flex flex-col items-center justify-center  mt-3 sm:mt-14">
        {/* title */}
        <div className="flex gap-2  ">
          <h1 className="font-medium text-xl sm:text-4xl text-gray-500">Latest <span className="font-bold text-slate-900">Collections</span></h1>
          <h1 className="bg-slate-600 h-0.5 sm:h-1 w-10 mt-3 sm:mt-5"></h1>
        </div>
         <h1 className="text-gray-500 text-xs px-2 sm:text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ipsum adipisci  </h1>
          
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-14 mt-10">
  {products.slice(0, 12).map((item, index) => (
    <div
      key={index}
      onClick={() => {
        navigate(`/product/${item._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden 
      shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex
           items-center justify-center shadow-md hover:bg-white transition"
        >
          🤍
        </button>

        {/* Price Badge */}
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

          <span className="text-xs text-gray-500">
            In Stock
          </span>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default LatestCollections