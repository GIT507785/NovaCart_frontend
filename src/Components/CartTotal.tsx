import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

interface CartTotalProps {
  subtotal: number;
}

const CartTotal = ({ subtotal }: CartTotalProps) => {
  const { currency, delivery_fee } = useContext(AppContext);

  const total = subtotal > 0 ? subtotal + delivery_fee : 0;

  return (
    <div className="sm:w-md w-full px-4 sm:ml-180 mt-10">
      <div className="flex text-2xl items-center gap-2">
        <h1 className="text-gray-600">
          CART <span className="text-black">TOTALS</span>
        </h1>

        <span className="w-10 h-[2px] bg-black"></span>
      </div>

      <div className="flex flex-col mt-4 gap-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="font-medium">Subtotal</p>

          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p className="font-medium">Shipping Fee</p>

          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between font-semibold">
          <p className="font-bold">Total</p>

          <p>
            {currency} {total.toFixed(2)}
          </p>
        </div>

        {/* Checkout */}
        <Link
          to="/payment"
          className="bg-black hover:bg-black/80 cursor-pointer transition-all
          text-white px-4 py-2 w-50 mt-5 sm:ml-64 text-center"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;