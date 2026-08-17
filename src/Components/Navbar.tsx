import { Link, NavLink } from 'react-router-dom'
import {assets } from '../assets/assets/assets'
import { LogOut, User } from 'lucide-react'
import React, { useContext, type SetStateAction } from 'react'
import { AppContext } from '../Context/AppContext'
import { PiPackageThin } from 'react-icons/pi'

 interface props {
  token:string | null
  setToken:React.Dispatch<SetStateAction<string | null>>
 }

const Navbar = ({token , setToken}:props) => {
  
   const { getCartCount } = useContext(AppContext);


   const NavLinks = [
    {name:"Home" , path:"/"},
    {name:"Collection" , path:"/collection"},
    {name:"About" , path:"/about"},
    {name:"Contact" , path:"/contact"},
   ]
    

  
  return (
    <div className='px-10'>
         <div className="flex justify-between px-2 sm:px-10 mt-5 border-b border-gray-300 pb-5">
            <Link to={'/'}>
              <img src={assets.logo} className='sm:w-30 w-20' alt="" />
            </Link>
            
            <div className='sm:flex hidden gap-4'>
              {NavLinks.map((item , index)=>(
                <div key={index}>
                   <NavLink to={item.path} className={({isActive})=> 
                    `hover:text-gray-500 text-sm  font-medium ${isActive ?   
                    'border-b-2 pb-1 border-gray-600':""}` }>
                     {item.name}
                   </NavLink>
                </div>
              ))}
            </div>

           <div className="flex  gap-2 sm:mt-2 items-center">
  {/* Search */}
  <img
    className="sm:w-5 sm:h-5 w-3 h-3 cursor-pointer"
    src={assets.search_icon}
    alt="Search"
  />

  {/* User */}
  {token ? (
    <div className="relative group">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition duration-300"
      >
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dropdown */}
      <div
        className="absolute right-0 top-12 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200
        opacity-0 invisible translate-y-2
        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
        transition-all duration-300 z-50 overflow-hidden"
      >
        <div className="p-2">
          <Link
            to="/myprofile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Profile
            </span>
          </Link>

          <Link
            to="/myorders"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <PiPackageThin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              My Orders
            </span>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-500">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition duration-300"
    >
      Login
    </Link>
  )}

              <Link to="/cartitems" className="-mt-5">
   {getCartCount() > 0 ? ( 
    <span className='flex items-center justify-center h-4 w-4 rounded-full bg-black text-white text-[10px]'>{getCartCount()}</span>
   ) : ( 
    <span className='flex items-center justify-center h-4 w-4 rounded-full bg-black text-white text-[10px]'>0</span>
   )} 

 
  <img
    className="sm:w-5 sm:h-5 w-3 h-3 cursor-pointer"
    src={assets.cart_icon}
    alt=""
    />
</Link>
    </div>
             <div className='sm:hidden block'>
              <img src={assets.menu_icon} className='sm:w-5 sm:h-5 w-3 h-3 ' alt="" />
             </div>
            </div>
         </div>
      
  )
}

export default Navbar