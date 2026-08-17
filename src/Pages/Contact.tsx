import image from '../assets/assets//laptop.jpg'
import OurPolicy from  "../Components/OurPolicy"
import NewsLetter from '../Components/NewsLetter'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className='sm:px-20 px-5 mt-5 sm:mt-20'> 
      
       <div className='flex gap-2 text-xl my-4 '>
        <h1 className='text-gray-500  '>CONTACT</h1>
        <h1 className='text-gray-900 font-semibold '>US</h1>
        <p className='w-10 h-[2px] bg-black font-extrabold mt-3'></p>
       </div> 


      <div className='flex flex-col  sm:flex-row gap-5 sm:gap-x-16'>
        <img src={image}  alt=""  className=' w-full sm:w-1/2    mt-2'/>
        <div>
          <h1 className='text-xl   text-gray-700  mt-3   my-3 font-semibold '>OUR STORE</h1>
          <p className='text-md text-gray-500 mt-4'> 5563 Willms Station</p>
          <p className='text-md text-gray-500  '> Suite 350, Washington , USA </p>
           
           <h1 className='text-md text-gray-500 mt-8'>Tel: 03423135480</h1>
           <h1 className='text-md text-gray-500'>Email: haseeb480@gamil.com</h1>

           <h2 className='text-xl text-gray-800 mt-8 my-2 font-serif '>CAREERS  FOREVER</h2>
           <p className='mt-5 text-sm '>Learn more about our  teams and job openings. </p>

           <Link 
            onClick={()=>window.scrollTo({top:0 , behavior:"smooth"})}
           to={'/'} className='border-1 border-gray-600 cursor-pointer  px-5 py-2.5 mt-10 mb-9 '>Shop Now</Link>
        </div>
      </div> 

      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Contact