import { assets } from "../assets/assets/assets";
import {motion} from 'framer-motion'

const Hero = () => {
  return (
    <section className="w-full px-3 sm:px-6 lg:px-10">
      <div
        className="
          mx-auto mt-6 sm:mt-10
          w-full max-w-7xl
          flex flex-col md:flex-row
          border border-gray-300
          overflow-hidden
        "
      >
        {/* Left Content */}
        <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="
    w-full md:w-1/2
    min-h-[280px] sm:min-h-[350px] md:min-h-[420px]
    px-5 sm:px-8 md:px-10 lg:px-14
    flex flex-col
    items-center
    justify-center
  "
>
  {/* Best Sellers */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex items-center gap-2 mb-3"
  >
    <span className="h-[1px] w-8 sm:w-10 bg-gray-600"></span>

    <h2 className="font-medium text-xs sm:text-sm text-slate-600 tracking-wide">
      OUR BESTSELLERS
    </h2>
  </motion.div>

  {/* Heading */}
  <motion.h1
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.4 }}
    className="
      text-3xl
      sm:text-4xl
      md:text-4xl
      lg:text-5xl
      text-slate-600
      font-serif
      text-center
      leading-tight
    "
  >
    Latest Arrivals
  </motion.h1>

  {/* Shop Now */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="flex items-center gap-2 mt-3"
  >
    <h2 className="font-medium text-xs sm:text-sm text-slate-600 tracking-wide">
      SHOP NOW
    </h2>

    <span className="h-[1px] w-8 sm:w-10 bg-gray-600"></span>
  </motion.div>
</motion.div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.hero_img}
            className="
              w-full
              h-[280px]
              sm:h-[350px]
              md:h-[420px]
              object-cover
            "
            alt="Latest Arrivals"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;