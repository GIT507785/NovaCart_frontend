import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";

  interface props{
    category:string,
    subCategory:string
  }
 
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
  bestseller: boolean;
}


const RelatedProducts = ({ category,subCategory}:props) => {
  
     const [relatedProduct , setRelatedProduct] = useState<Product[]>([])

     const fetchProducts = async () => {
  try {
    const { data } = await axios.get(
      `${VITE_BACKEND_URL}/api/user/allproducts`
    );

    if (data.success) {
      const productCopy = data.items.filter(
        (item: any) =>
          item.category === category &&
          item.subCategory === subCategory
      );

      setRelatedProduct(productCopy.slice(0, 5));
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
  }
};

       const navigate = useNavigate()

      useEffect(()=>{
        fetchProducts()
      },[])

       if (relatedProduct.length === 0) {
  return (
    <div>
      <h1>Related Product Not Found 🙄</h1>
    </div>
  );
}

  return (
     <div className="mt-15">
        <div className="flex gap-2 items-center justify-center">
        <h1 className="font-medium text-xl sm:text-4xl text-gray-500">
          RELATED <span className="font-bold text-slate-900">PRODUCTS</span>
        </h1>
        <h1 className="bg-slate-600 h-0.5 sm:h-1 w-10 mt-3 sm:mt-5"></h1>
      </div>

   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-14 mt-14">
  {relatedProduct.map((item) => (
    <div
      key={item._id}
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
          className="w-full h-54 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Related Badge */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Related
        </span>

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
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
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
          View Product
        </button>
      </div>
    </div>
  ))}
</div>

     </div>
  )
}

export default RelatedProducts