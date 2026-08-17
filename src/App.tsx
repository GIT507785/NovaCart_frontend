import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import Collection from "./Pages/Collection"
import Contact from "./Pages/Contact"
import About from "./Pages/About"
import Login from "./Pages/Login"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import ProductDetails from "./Pages/ProductDetails"
import { ToastContainer } from "react-toastify"
import CartItems from "./Pages/CartItems"
import PaymentPage from "./Pages/PaymentPage"
import MyOrders from "./Pages/MyOrders"
import { useState } from "react"
import Profile from "./Pages/Profile"

 
 const Layout = ()=>{

  
  const [token , setToken] = useState(localStorage.getItem('token') || null) 

  return(
    <>
    <Navbar token={token} setToken={setToken}/>
    <Outlet/>
    </>
  )
 }


const App = () => {
  
   const router = createBrowserRouter([
    {
     path:"/",
     Component:Layout,
     children:[
      
       {
         index:true,
         Component:Home
        },{
          path:"collection",
           Component:Collection
      },
    {
    path:"/contact",
    Component:Contact
    },
   {
     path:"about",
     Component:About
   },{
     path:"login",
     Component:Login
   },
   {
    
    path:'/product/:productId',
    Component:ProductDetails
  
  },
  {
    path:"cartitems",
    Component:CartItems
  },
  {
    path:"payment",
    Component:PaymentPage
  },
  {
    path:"myorders",
    Component:MyOrders
  },
  {
    path:"myprofile",
    Component:Profile
  },
     
  ]
  },
   
  ])
  
  return (
    <>
    <ToastContainer/>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  )
}

export default App