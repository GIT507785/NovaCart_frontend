import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

interface OrderItem {
  itemId: string;
  name: string;
  image: string;
  description: string;
  size: string;
  quantity: number;
  price: number;
  productId:string
}

interface Order {
  _id: string;
  items: OrderItem[];

  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  paymentMethod: string;

  orderStatus:
    | "Pending"
    | "Canceled"
    | "Delivered"
    | "OutForDelivery"
    | "Processing";

  subTotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;

  isDelivered: boolean;
  isCancelled: boolean;

  createdAt: string;
  updatedAt: string;
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
   const [loading , setloading] = useState(false)

  const { token } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
       
       setloading(true)

      if (!token) {
        return;
      }
        
      const { data }= await axios.get(
        `${VITE_BACKEND_URL}/api/user/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message
      );
    } finally{
      setloading(false)
    }
  };

   const cancelOrder = async (orderId: string) => {
  try {
    const { data } = await axios.put(
      `${VITE_BACKEND_URL}/api/user/cancelOrder`,
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success("Order cancelled successfully");

      // Status immediately update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: "Canceled",
                isCancelled: true,
              }
            : order
        )
      );
    } else {
      toast.error(data.message);
    }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || error.message
    );
  }
};

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

   if(loading){
    return (
      <div className="w-full h-full flex items-center justify-center flex-col mt-10"> 
        <div className="w-10 h-10  rounded-full bg-gray-100 flex items-center justify-center">
          <Loader className="animate-spin w-6 h-6 text-gray-400"/>
        </div>
        🤕 Loading....
      </div>
    )
   }

  return (
    <div className="mt-10 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-light tracking-wide uppercase text-gray-700 whitespace-nowrap">
          MY <span className="font-semibold text-black">ORDERS</span>
        </h2>

        <div className="flex-1 h-px bg-gray-400 max-w-[90px]" />
      </div>

      {/* Orders */}
      <div>
        {orders.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            No orders found.
          </p>
        ) : (
          orders.map((order) =>
            order.items.map((item, index) => (
              <div
                key={`${order._id}-${index}`}
                className="
                  border-t border-gray-300
                  py-6 sm:py-7
                  flex flex-col
                  gap-6
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                {/* Product Info */}
                <div className="flex gap-4 sm:gap-5 min-w-0">
                  {/* Image */}
                  <div className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-24 h-24
                        sm:w-28 sm:h-28
                        md:w-32 md:h-32
                        object-cover
                      "
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <p className="font-medium mt-1 sm:mt-3 text-sm sm:text-base line-clamp-2">
                      {item.name}
                    </p>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-x-3
                        gap-y-1
                        mt-2
                        text-sm
                        text-gray-700
                      "
                    >
                      <p>${item.price}</p>

                      <p>
                        Size:{" "}
                        <span className="uppercase">
                          {item.size}
                        </span>
                      </p>

                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <p className="text-black font-medium mt-3 text-sm sm:text-base">
                      Date{" "}
                      <span className="text-gray-600 font-normal text-sm ml-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status + Button */}
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    lg:justify-end
                    gap-4
                    sm:gap-8
                    lg:gap-10
                    w-full
                    lg:w-auto
                  "
                >
                  {/* Status */}
                  <div className="flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500"
                          : order.orderStatus === "Canceled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    />

                    <span>
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Track Button */}
                 <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

  {/* Track Order */}
  <button
    className="
      w-full
      sm:w-auto
      px-5
      py-2.5
      bg-white
      border
      border-gray-300
      rounded
      text-sm
      hover:bg-gray-50
      transition
    "
  >
    Track Order
  </button>

  {/* Cancel Order */}
  {order.orderStatus !== "Delivered" &&
    order.orderStatus !== "OutForDelivery" &&
    order.orderStatus !== "Canceled" && (
      <button
        onClick={() => cancelOrder(order._id)}
        className="
          w-full
          sm:w-auto
          px-5
          py-2.5
          bg-white
          border
          border-red-300
          text-red-600
          rounded
          text-sm
          hover:bg-red-50
          transition
        "
      >
        Cancel Order
      </button>
    )}

</div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default MyOrders;
