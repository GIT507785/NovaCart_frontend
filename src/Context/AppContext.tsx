import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../API/api";

interface CartItem {
  _id: string;
  product: any;
  quantity: number;
  size: string;
}

interface AppContextType {
  cartItems: CartItem[];



  removeFromCart: (
    productId: string,
    size: string
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => Promise<void>;

  token: string | null;

  setToken: React.Dispatch<
    SetStateAction<string | null>
  >;

  getCartCount: () => number;

  getCartAmount: () => number;

  getCartItems: () => Promise<void>;

  currency: string;

  delivery_fee: number;
}

export const AppContext = createContext<AppContextType>(
  {} as AppContextType
);

const AppContextProvider = ({
  children,
}: PropsWithChildren) => {
  const currency = "$";
  const delivery_fee = 10;

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // ================= GET CART =================

  const getCartItems = async () => {
    try {
      if (!token) {
        setCartItems([]);
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


      if (data.success) {

        setCartItems(data.cart || []);
      } else {
        toast.error(data.message);
        setCartItems([]);
      }
    } catch (error: any) {
      console.log(
        "GET CART ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          error.message
      );

      setCartItems([]);
    }
  };

  // ================= GET CART ON TOKEN =================

  useEffect(() => {
    getCartItems();
  }, [token]);

  // ================= REMOVE =================

  const removeFromCart = async (
    productId: string,
    size: string
  ) => {
    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/user/remove-cart`,
        {
          productId,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // Refresh cart from backend
        await getCartItems();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (
    productId: string,
    size: string,
    quantity: number
  ) => {
    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/user/update-quantity`,
        {
          productId,
          size,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        await getCartItems();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(
        "UPDATE QUANTITY ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  // ================= CART COUNT =================

  const getCartCount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  // ================= CART AMOUNT =================

  const getCartAmount = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;

      return (
        total +
        Number(item.product.price || 0) *
          Number(item.quantity || 0)
      );
    }, 0);
  };

  // ================= CONTEXT VALUE =================

  const value: AppContextType = {
    cartItems,
    getCartItems,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    currency,
    delivery_fee,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;