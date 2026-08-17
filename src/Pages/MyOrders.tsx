import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { products } from "../assets/assets/assets"


 

function MyOrders() {

  interface products {
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
      

      const [orders, setOrders] = useState<products[]>([])
      const {cartItems} = useContext(AppContext)

      useEffect(()=>{
        setOrders(products)
      },[])
     

  return (
    <div className="mt-10 sm:px-20">
        <div className="flex items-center gap-2 mb-8">
    <h2 className="text-3xl font-light tracking-wide uppercase text-gray-700">
        MY <span className="font-semibold text-black">ORDERS</span>
    </h2>
    <div className="flex-1 h-px bg-gray-400 max-w-[90px]" />
  </div>
     <div>
      <div>
        {orders.slice(0,2).map((item , index)=>(
            <div key={index} className=" border-t p-7 border-gray-300   flex sm:justify-between sm:flex-row flex-col">
                <div className="flex gap-2">

              <div>
                <img src={item.image[0]} alt="" className="w-30 mt-5 h-30" />
              </div>
               <div>
                 <p className="font-medium mt-6 ">{item.name}</p>
                  <div className="flex gap-2 mt-1 text-gray-700">
                   <p>${item.price}</p>
                   <p>Size:{item.sizes.slice(0,1)}</p>
                    <p>Quantity:1</p>
                  </div>
                  <p className="text-black font-medium mt-3">Date 
                    <span className="text-gray-600 text-sm">25, May , 2024</span> </p>
               </div>
                </div>
       <div className="mt-10 flex gap-3">
         <div className="w-3 h-3 mt-2 rounded-full bg-green-500"/>
         Ready to ship

       </div>
       <div>    
        <button className="px-3 py-1 mt-10 bg-white border border-gray-300 rounded">Track Order</button>
       </div>
            </div>
        ))}
      </div>
     </div>
    </div>
  )
}

export default MyOrders