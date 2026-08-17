import {assets} from "../assets/assets/assets"
import OurPolicy from '../Components/OurPolicy'
import NewsLetter from '../Components/NewsLetter'

const About = () => {
  return (
    <div className=' flex flex-col justify-center mt-7 py-4 px-5 sm:px-20'>  
       <div className='flex gap-3 mb-10'>
       <h1 className='text-gray-600  text-xl sm:text-2xl '>ABOUT</h1>
        <h1 className='font-semibold text-2xl text-gray-950 '>US</h1>
        <p className='h-[2px]  w-10 bg-black mt-4 font-extrabold'></p>
       </div>

       <div className='flex flex-col sm:flex-row   sm:gap-x-25     gap-6 justify-between'>
       <img src={assets.about_img} alt="" className='w-full sm:w-1/2 h-80' />
       <div className='text-gray-700 text-sm md:text-md    '>
       <p className='my-9'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet, corrupti nemo ipsa tempora corporis earum officiis error animi eius voluptates ad explicabo nulla facere dolorem non, enim perferendis assumenda.</p>  
              <p className='my-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet, corrupti nemo ipsa tempora corporis earum officiis error animi eius voluptates ad explicabo nulla facere dolorem non, enim perferendis assumenda.</p> 
               <h1 className='text-2xl font-bold'>Our Mission </h1>
                     <p className='my-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet, corrupti nemo ipsa tempora corporis earum officiis error animi eius voluptates ad explicabo nulla facere dolorem non, enim perferendis assumenda.</p> 
       </div>
       </div> 

       {/* boxess section */}
       <div className='my-6 right-0 '>
       <div className='flex gap-2 text-xl'>
        <h1 className='text-gray-500  '>WHY</h1>
        <h1 className='text-gray-900 font-semibold '>CHOOSE US</h1>
        <p className='w-10 h-[2px] bg-black font-extrabold mt-3'></p>
       </div>  
         {/* boexes */}
         <div className='items-center flex flex-col sm:flex-row '>
          <div className='border-1  border-gray-500  px-6 my-7 py-10  w-full sm:w-1/2  '>
            <h1 className='font-bold   text-gray-500 text-md '>QUALITY ASSURANCE</h1>
            <p className='  text-gary-400 font-light pt-2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo placeat deleniti molestiae quibusdam facere error!</p>
          </div> 
             <div className='border-1 border-gray-700  px-6 my-7 py-10  w-full sm:w-1/2  '>
            <h1 className='font-bold   text-gray-500 text-md '>QUALITY ASSURANCE</h1>
            <p className='  text-gary-400 font-light pt-2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo placeat deleniti molestiae quibusdam facere error!</p>
          </div> 
           <div className='border-1 border-gray-700  px-6 my-7 py-10  w-full sm:w-1/2  '>
            <h1 className='font-bold  text-gray-500 text-md '>QUALITY ASSURANCE</h1>
            <p className='  text-gary-400 font-light pt-2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo placeat deleniti molestiae quibusdam facere error!</p>
          </div> 
         </div>
       </div>
         
           <OurPolicy/> 
           <NewsLetter/>
    </div>
  )
}

export default About