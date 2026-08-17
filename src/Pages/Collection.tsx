import { useEffect, useState, type ChangeEvent } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  image: string[];
  price: number;
  category: string;
  subCategory: string;
};

const Collection = () => {
  const navigate = useNavigate()
   const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [loading , setLoading] = useState(false)
  
  const fetchAllproducts = async () =>{
   try {
       setLoading(true)
      const {data} = await axios.get(`${VITE_BACKEND_URL}/api/user/allproducts` , {})

      if(data.success){
        setProducts(data.items)
       setFilteredProducts(data.items)
      } else {
       toast.error(data.error)
      }
   } catch (error:any) {
     toast.error(error.message)
   } finally{
    setLoading(false)
   }
  }
  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  const applyFilter = () => {
    let productCopy = [...products] as Product[];

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productCopy);
  };
  

    useEffect(()=>{
      fetchAllproducts()
    },[])

  const sortProducts = () => {
    let copy = [...filteredProducts];

    switch (sortType) {
      case "low to high":
        copy.sort((a, b) => a.price - b.price);
        break;

      case "high to low":
        copy.sort((a, b) => b.price - a.price);
        break;

      default:
        applyFilter();
        return;
    }

    setFilteredProducts(copy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

   if(products.length <  0){
    setLoading(true)
   }

   if (loading) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <Loader2 className="animate-spin" />
        Loading Products...
      </div>
    </div>
  );
}

   


  return (
     <>
      <div className="flex items-center gap-4 mt-10 justify-center">
    <h2 className="text-3xl font-light tracking-wide uppercase text-gray-700">
      ALL <span className="font-semibold text-black">COLLECTIONS</span>
    </h2>

    <div className="flex-1 h-px bg-gray-400 max-w-22.5" />
  </div>
    <div className="flex justify-between mt-10 sm:px-15 px-5">
      {/* Filters */}


      <div>
        <h1 className="text-xl font-medium">Filters</h1>

        {/* Categories */}
        <div className="w-40 h-30 mt-5 border border-gray-300 px-4 py-3">
          <h1 className="text-sm text-gray-600">CATEGORIES</h1>

          <div className="flex gap-2 mt-3">
            <input
              type="checkbox"
              value="Men"
              checked={category.includes("Men")}
              onChange={toggleCategory}
            />
            <p className="text-gray-600">Men</p>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              value="Women"
              checked={category.includes("Women")}
              onChange={toggleCategory}
            />
            <p className="text-gray-600">Women</p>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              value="Kids"
              checked={category.includes("Kids")}
              onChange={toggleCategory}
            />
            <p className="text-gray-600">Kids</p>
          </div>
        </div>

        {/* Type */}
        <div className="w-40 h-30 mt-5 border border-gray-300 px-4 py-3">
          <h1 className="text-sm text-gray-600">TYPE</h1>

          <div className="flex gap-2 mt-3">
            <input
              type="checkbox"
              value="Topwear"
              checked={subCategory.includes("Topwear")}
              onChange={toggleSubCategory}
            />
            <p className="text-gray-600">Topwear</p>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              value="Bottomwear"
              checked={subCategory.includes("Bottomwear")}
              onChange={toggleSubCategory}
            />
            <p className="text-gray-600">Bottomwear</p>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              value="Winterwear"
              checked={subCategory.includes("Winterwear")}
              onChange={toggleSubCategory}
            />
            <p className="text-gray-600">Winterwear</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-4 px-3 mt-10 sm:grid-cols-4 sm:px-14">
        {filteredProducts.map((item) => (
          <div className="cursor-pointer hover:-translate-y-5 transition-all duration-400" 
           onClick={()=>navigate(`/product/${item._id}`)} key={item._id}>
            <img src={item.image[0]} alt={item.name} />
            <p className="mt-3 text-xs font-medium text-gray-600 sm:text-sm">
              {item.name}
            </p>
            <p className="text-xs font-medium text-slate-950 sm:text-sm">
              ${item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Sort */}
      <div>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border border-gray-300 outline-none cursor-pointer"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="low to high">Sort by: Low To High</option>
          <option value="high to low">Sort by: High To Low</option>
        </select>
      </div>

    </div>
     </>
  );
};

export default Collection;