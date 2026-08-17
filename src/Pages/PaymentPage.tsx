import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets/assets";
import "react-country-state-city/dist/react-country-state-city.css";
import { Country, State, City } from "country-state-city";
import { useMemo} from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../API/api";
import { toast } from "react-toastify";


 interface  formdata {
 firstName: string;
 lastName: string;
 email: string;
 street: string;
 city: string;
 state: string;
 zipCode: string;
 country: string;
 number: string;
}

const PaymentPage = () => {
 
       const {cartItems} = useContext(AppContext)  
      const [paymentMethod ,setPaymentMethod] = useState('')
      const { currency, delivery_fee, getCartAmount } = useContext(AppContext);        
       const subtotal = getCartAmount();
       const total = subtotal > 0 ? subtotal + delivery_fee : 0;

       const [formdata , setFormData] = useState<formdata>({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipCode:'',
        country:"",
        number:'' 
       })

       const countries = useMemo(() => Country.getAllCountries(), []);

const states = useMemo(() => {
  return formdata.country
    ? State.getStatesOfCountry(formdata.country)
    : [];
}, [formdata.country]);

const cities = useMemo(() => {
  return formdata.country && formdata.state
    ? City.getCitiesOfState(formdata.country, formdata.state)
    : [];
}, [formdata.country, formdata.state]);


        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
           
            const {name , value } = e.target;

            setFormData((prev)=>({
                ...prev, [name]:value
            }))

        }
const handleForm = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    // ==============================
    // PAYMENT METHOD
    // ==============================

    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    // ==============================
    // TOKEN
    // ==============================

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    // ==============================
    // CART
    // ==============================

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // ==============================
    // ORDER ITEMS
    // ==============================

    const orderItems = cartItems.map((item: any) => ({
      itemId: item.product._id,

      name: item.product.name,

      image: Array.isArray(item.product.image)
        ? item.product.image[0]
        : item.product.image,

      description: item.product.description || "",

      size: item.size,

      quantity: Number(item.quantity),

      price: Number(item.product.price),
    }));

    // ==============================
    // ORDER DATA
    // ==============================

    const orderData = {
      items: orderItems,

      shippingAddress: {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        phone: formdata.number,
        address: formdata.street,
        city: formdata.city,
        state: formdata.state,
        postalCode: formdata.zipCode,
        country: formdata.country,
      },

      paymentMethod,

      subTotal: Number(subtotal),

      shippingFee: Number(delivery_fee || 0),

      tax: 0,

      totalAmount: Number(total),
    };

    // ==============================
    // CHECK PAYLOAD
    // ==============================

    console.log(
      "ORDER DATA:",
      JSON.stringify(orderData, null, 2)
    );

    // ==============================
    // API
    // ==============================

    const { data } = await axios.post(
      `${VITE_BACKEND_URL}/api/user/placeOrder`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ORDER RESPONSE:", data);

    // ==============================
    // SUCCESS
    // ==============================

    if (data.success) {
      toast.success(data.message || "Order placed successfully");

      console.log("CREATED ORDER:", data.order);

      // Yahan baad mein cart clear kar sakte ho
      // clearCart();

      return;
    }

    toast.error(data.message || "Failed to place order");

  } catch (error: any) {
    console.log(
      "========== ORDER ERROR =========="
    );

    console.log(
      "STATUS:",
      error.response?.status
    );

    console.log(
      "DATA:",
      error.response?.data
    );

    console.log(
      "MESSAGE:",
      error.message
    );

    console.log(
      "================================="
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to place order"
    );
  }
};

  return (
    <div className="flex sm:flex-row flex-col mt-10   sm:justify-between px-4 sm:px-10">
        <div>
           
      <div className="max-w-3xl mx-auto bg-white">
  {/* Heading */}
  <div className="flex items-center gap-4 mb-8">
    <h2 className="text-3xl font-light tracking-wide uppercase text-gray-700">
      Delivery <span className="font-semibold text-black">Information</span>
    </h2>

    <div className="flex-1 h-px bg-gray-400 max-w-[90px]" />
  </div>

  <form onSubmit={handleForm} className="space-y-5">
    {/* First & Last Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input
        type="text"
        name="firstName"
        value={formdata.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-sm outline-none focus:border-black transition"
        required
      />

      <input
        type="text"
        name="lastName"
        value={formdata.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-sm outline-none focus:border-black transition"
        required
      />
    </div>

    {/* Email */}
    <input
      type="email"
      name="email"
      value={formdata.email}
      onChange={handleChange}
      placeholder="Email Address"
      className="w-full h-12 border border-gray-300 rounded-md px-4 text-sm outline-none focus:border-black transition"
      required
    />

    {/* Street */}
    <input
      type="text"
      name="street"
      value={formdata.street}
      onChange={handleChange}
      placeholder="Street"
      className="w-full h-12 border border-gray-300 rounded-md px-4 text-sm outline-none focus:border-black transition"
      required
    />

    {/* Country & State */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <select
  name="country"
  value={formdata.country}
   onChange={(e) => {
    setFormData({
      ...formdata,
      country: e.target.value,
      state: "",
      city: "",
    });
  }}  className="w-full h-12 rounded-md border border-gray-300 px-4 outline-none focus:border-black transition"
>
  <option value="">Select Country</option>

  {countries.map((country:any) => (
    <option key={country.isoCode} value={country.isoCode}>
      {country.name}
    </option>
  ))}
</select>

   <select
  name="state"
  value={formdata.state}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      state: e.target.value,
      city: "",
    }))
  }
  className="w-full h-12 rounded-md border border-gray-300 px-4 outline-none
   focus:border-black transition"
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option key={state.isoCode} value={state.isoCode}>
      {state.name}
    </option>
  ))}
</select>
    </div>

    {/* City & Zip */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
     <select
  name="city"
  value={formdata.city}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }))
  }
  className="w-full h-12 rounded-md border border-gray-300 px-4 outline-none focus:border-black transition"
>
  <option value="">Select City</option>

  {cities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ))}
</select>

      <input
        type="text"
        name="zipCode"
        value={formdata.zipCode}
        onChange={handleChange}
        placeholder="Zip Code"
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-sm outline-none focus:border-black transition"
        required
      />
    </div>

    {/* Phone */}
    <input
      type="tel"
      name="number"
      value={formdata.number}
      onChange={handleChange}
      placeholder="Phone"
      className="w-full h-12 border border-gray-300 rounded-md
       px-4 text-sm outline-none focus:border-black transition"
      required
    />
      
      <button type="submit"  
         className="bg-black absolute  sm:top-110 sm:right-13 hover:bg-black/80  hidden sm:flex items-center justify-center 
         cursor-pointer transition-all
          text-white px-4 py-2 w-50 mt-10 sm:ml-60">PLACE ORDER</button>

  </form>
</div>
 
        </div>
         <div className="flex flex-col">
               <div className="sm:w-md w-full px-4    mt-10">
      <div className="flex text-2xl items-center gap-2 ">
        <h1 className="text-gray-600">
          CART <span className="text-black">TOTALS</span>
        </h1>

        <span className="w-10 h-[2px] bg-black"></span>
      </div>

      <div className="flex flex-col mt-4 gap-3 text-sm">
        <div className="flex justify-between">
          <p className="font-medium">Subtotal</p>
          <p>
            {currency} {subtotal}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p className="font-medium">Shipping Fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <p className="font-bold">Total</p>
          <p>
            {currency} {total}
          </p>
        </div>
         <div>
             <div className="flex text-2xl mt-5 items-center gap-2 ">
        <h1 className="text-gray-600">
          PAYMENT <span className="text-black">METHOD</span>
        </h1>

        <span className="w-10 h-[2px] bg-black"></span>
      </div> 
            
            <div className="mt-6 flex gap-7 sm:flex-row flex-col justify-between">
               <div className="border sm:w-40 border-gray-300 px-3 py-1 flex items-center justify-center gap-2">
                   <span onClick={()=>setPaymentMethod('stripe')} className={`${paymentMethod === 'stripe'  ? 'bg-blue-600 border-yellow-500 border  transition-all' :'bg-white '} h-3 w-3   sm:w-19 border-gray-400 rounded-full border`}></span>
                 <img src={assets.stripe_logo} alt="" className="w-20 h-7" />
                </div>  
                <div className="border items-center justify-center sm:w-70 border-gray-300 px-4 py-1 flex gap-2">
                   <span onClick={()=>setPaymentMethod('razorpay')} className={`${paymentMethod === 'razorpay'  ? 'bg-blue-600 border-yellow-500 border  transition-all' :'bg-white '} 
                    h-4 w-4  border-gray-400 rounded-full border`}></span>
                 <img src={assets.razorpay_logo} alt="" className="w-20 h-7"/>
                </div>  
                <div className="border border-gray-300 sm:w-60   items-center justify-center px-2 py-1 flex gap-2">
                   <span onClick={()=>setPaymentMethod('cod')} className={`${paymentMethod === 'cod'  ? 'bg-blue-600 border-yellow-500 border  transition-all' :'bg-white '} h-4 sm:h-3 w-4 border-gray-400 rounded-full border`}></span>
                  <h1 className="text-xs text-gray-400">CASH ON DELIVERY</h1>
                </div>  
            </div>

         </div>
                  <button type="submit"  
         className="bg-black sm:hidden mt-10 hover:bg-black/80  flex items-center justify-center 
         cursor-pointer transition-all
          text-white px-4 py-2 w-50  sm:ml-60">PLACE ORDER</button>    
      </div>
    </div>
         </div>
        </div>
  )
}

export default PaymentPage