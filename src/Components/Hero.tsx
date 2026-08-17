import { assets } from "../assets/assets/assets"

const Hero = () => {
  return ( 
    <div className="flex items-center justify-center">

    <div className="mt-10   sm:flex-row flex-col flex  w-50 sm:h-100 sm:w-300  border border-gray-300">
      <div className="sm:w-150 w-50 px-4 sm:h-auto h-50 flex flex-col items-center justify-center">
        <div className="flex gap-2 sm:-ml-14">
            <span className="h-1 w-10 mt-2 bg-gray-600"></span>
            <h1 className="font-medium text-sm  text-slate-600">OUR BESTSELLERS </h1>
        </div>
         <h1 className="text-4xl  text-slate-600 font-serif">Latest Arrivals</h1>
         <div className="flex gap-2 sm:-ml-26 mt-1">
            <h1 className="font-medium text-sm  text-slate-600">SHOP NOW </h1>
            <span className="h-1 w-10 mt-2 bg-gray-600"></span>
        </div>
      </div>
      <div className="">
        <img src={assets.hero_img} className="sm:h-100 h-50 w-50 sm:w-150" alt="" />
      </div>
    </div>
    </div>
  )
}

export default Hero