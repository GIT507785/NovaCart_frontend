import {  useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "lucide-react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";
import RelatedProducts from "../Components/RelatedProducts";
import { AppContext } from "../Context/AppContext";

interface Pro {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  size: string[];
  date: number;
  bestseller: boolean;
  user:string[]
}

const ProductDetails = () => {
  const { token } =  useContext(AppContext);

  const { productId } = useParams();

  const [productDetail, setProductDetail] = useState<Pro | null>(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
   const [cartItems , setCartItems] = useState([])

  const fetchProductDetails = async (id: string) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/user/productDetails`,
        { productId: id }
      );
      if (data.success) {
        setProductDetail(data.product);
        setImage(data.product.image[0]);
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
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-xl font-semibold">Product Not Found</h1>
      </div>
    );
  }
  if (!cartItems) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-xl font-semibold">cart items Not Found</h1>
      </div>
    );
  }


const addToCart = async (
  productId: string,
  size: string,
) => {
  try {
    const { data } = await axios.post(
      `${VITE_BACKEND_URL}/api/user/addtocart`,
      {
        productId,
        size,
      },
        {
    headers: {
        Authorization: `Bearer ${token}`
    },
  }
    );

    if (data.success) {
      toast.success(data.message);
      setCartItems(data.addItem); // backend addItem return kar raha hai
    } else {
      toast.error(data.message);
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message);
  }
};
   

  return (
    <div className="px-4 sm:px-12 lg:px-20 mt-10">
      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left */}
        <div className="flex sm:flex-row flex-col gap-4">

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
            {productDetail.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer rounded border ${
                  image === img
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={image}
              alt={productDetail.name}
              className="w-full h-[500px] object-cover rounded"
            />
          </div>

        </div>

        {/* Right */}
        <div>

          <h1 className="text-3xl font-bold">
            {productDetail.name}
          </h1>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={20}
                className="fill-yellow-400 stroke-yellow-400"
              />
            ))}

            <span className="ml-2 text-gray-500">(122 Reviews)</span>
          </div>

          <h2 className="text-2xl font-bold mt-5">
            ${productDetail.price}
          </h2>

          <p className="text-gray-600 mt-5">
            {productDetail.description}
          </p>

          <h3 className="font-semibold mt-8 mb-3">
            Select Size
          </h3>

          <div className="flex gap-3 flex-wrap">
            {productDetail.size.map((item) => (
              <button
                key={item}
                onClick={() => setSize(item)}
                className={`w-12 h-12 border cursor-pointer transition ${
                  size === item
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
               console.log("clicked")
              if (!size) {
                toast.error("Please select a size first");
                return;
              }
               if(!token){
                toast.error('Token not found')
               }
              addToCart(productDetail._id, size);
            }}
            className="mt-8 bg-black text-white px-8 py-3 hover:bg-gray-800 transition cursor-pointer"
          >
            ADD TO CART
          </button>

          <hr className="my-8" />

          <div className="text-gray-500 space-y-2 text-sm">
            <p>✓ 100% Original Product.</p>
            <p>✓ Cash on Delivery Available.</p>
            <p>✓ Easy Return & Exchange within 7 Days.</p>
          </div>

        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <div className="border border-gray-300 p-4">
            <h1 className="font-bold">Description</h1>
          </div>

          <div className="border border-gray-300 bg-gray-50 p-4">
            <h1 className="text-gray-500">Reviews (122)</h1>
          </div>
        </div>

        <div className="border border-gray-300 p-6">
          <p className="text-gray-500">
            {productDetail.description}
          </p>
        </div>
      </div>

       <RelatedProducts
        category={productDetail.category}
        subCategory={productDetail.subCategory}
      /> 
    </div>
  );
};

export default ProductDetails;