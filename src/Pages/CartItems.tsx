import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import CartTotal from "../Components/CartTotal";
import { VITE_BACKEND_URL } from "../API/api";
import { Loader } from "lucide-react";

const CartItems = () => {
  const { removeFromCart, updateQuantity, token } =
    useContext(AppContext);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= Get Cart Items =================

  const getCartItems = async () => {
    try {
      if (!token) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/user/getCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("GET CART RESPONSE:", data);
      console.log("CART ITEMS:", data.cart);

      if (data.success) {
        setCartItems(data.cart || []);
      } else {
        console.log(data.message);
        setCartItems([]);
      }
    } catch (error: any) {
      console.log(
        "GET CART ERROR:",
        error.response?.data || error.message
      );

      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= Cart Count =================

   const getCartCount = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // ================= Cart Amount =================

  const getCartAmount = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;

      return (
        total +
        Number(item.product.price) * Number(item.quantity)
      );
    }, 0);
  };

  // ================= Fetch Cart =================

  useEffect(() => {
    getCartItems();
    getCartCount()
  }, [token]);

  // ================= Loading =================

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

  // ================= UI =================

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h1 className="text-2xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-5">
            {cartItems.map((item) => {
              const product = item.product;

              if (!product) return null;

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-center gap-5 border-b py-5"
                >
                  {/* Product */}

                  <div className="flex gap-5 items-center w-full">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover border rounded"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">
                        {product.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        ${product.price}
                      </p>

                      <p className="mt-1">
                        Size:
                        <span className="font-semibold ml-2">
                          {item.size}
                        </span>
                      </p>

                      <p className="mt-1">
                        Quantity:
                        <span className="font-semibold ml-2">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}

                  <div>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      className="w-20 border border-gray-500 rounded p-2 outline-none focus:ring-2 focus:ring-green-600"
                      onChange={(e) => {
                        const quantity = Number(
                          e.target.value
                        );

                        if (quantity >= 1) {
                          updateQuantity(
                            product._id,
                            item.size,
                            quantity
                          );

                          setCartItems((prev) =>
                            prev.map((cartItem) =>
                              cartItem._id === item._id
                                ? {
                                    ...cartItem,
                                    quantity,
                                  }
                                : cartItem
                            )
                          );
                        }
                      }}
                    />
                  </div>

                  {/* Remove */}

                  <button
                    onClick={() => {
                      removeFromCart(
                        product._id,
                        item.size
                      );

                      setCartItems((prev) =>
                        prev.filter(
                          (cartItem) =>
                            cartItem._id !== item._id
                        )
                      );
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Total */}

          <div className="mt-10 flex justify-end">
            <CartTotal subtotal={getCartAmount()} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;