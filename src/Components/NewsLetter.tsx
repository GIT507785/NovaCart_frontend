import type React from "react"

const NewsLetter = () => {

  const onSubmitHandler = (event:React.FormEvent) =>{
      event.preventDefault()

    }
  return (
    <div className='text-center mt-5 sm:mt-20'> 
    <p className='text-2xl text-gray-700 font-medium'>subscribe now & get  20% off</p>
    <p className='mt-3 text-gray-400'>Lorem ipsum  Dolorem temporibus praesentium cumque impedit dolores   voluptate  aut eos, <br /> nesciunt recusandae maiores consequuntur?</p>

    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 items-center flex mx-auto my-6 gap-3 border pl-3' >
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email'  required/>
        <button type='submit' className=' bg-black text-white text-xs px-10 py-4'> SUBSCRIBE</button>
    </form>

    </div>
  )
}

export default NewsLetter