import { MdCurrencyExchange } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

const OurPolicy = () => {
  return (
    <div className='flex flex-col  mt-7 sm:mt-20  sm:flex-row justify-around gap-6  sm:gap-2 
        py-10   sm:text-sm md:texe-base text-gray-7000'> 
        <div>
            <MdCurrencyExchange  className='w-8 h-6  ml-1 sm:m-auto mb-4' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer  hassel free exchange policy </p>
        </div>

           <div>
            <BsPatchCheckFill   className='w-8 h-6  ml-1  sm:m-auto mb-2' />
            <p className='font-semibold'>7 days Return Policy</p>
            <p className='text-gray-400'>We Provide 7 days free policy </p>
        </div>

           <div>
            <BiSupport  className='w-8 h-6  ml-1   sm:m-auto mb-2' />
            <p className='font-semibold'>best customer Support </p>
            <p className='text-gray-400'>We Provide 24/7 customer Support </p>
        </div>


   </div>
  )
}

export default OurPolicy