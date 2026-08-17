import { MdCurrencyExchange } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

const OurPolicy = () => {
  return (
    <section
      className="
        w-full
        mt-10
        sm:mt-20
        px-4
        sm:px-8
        lg:px-10
        py-8
        sm:py-12
        text-gray-700
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-8
          sm:gap-5
          lg:gap-10
        "
      >
        {/* Exchange Policy */}
        <div className="flex flex-col items-center text-center">
          <MdCurrencyExchange
            className="w-8 h-8 sm:w-9 sm:h-9 mb-3 text-gray-700"
          />

          <p className="font-semibold text-sm sm:text-base">
            Easy Exchange Policy
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs">
            We offer hassle-free exchange policy
          </p>
        </div>

        {/* Return Policy */}
        <div className="flex flex-col items-center text-center">
          <BsPatchCheckFill
            className="w-7 h-7 sm:w-8 sm:h-8 mb-3 text-gray-700"
          />

          <p className="font-semibold text-sm sm:text-base">
            7 Days Return Policy
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs">
            We provide a 7-day free return policy
          </p>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col items-center text-center">
          <BiSupport
            className="w-8 h-8 sm:w-9 sm:h-9 mb-3 text-gray-700"
          />

          <p className="font-semibold text-sm sm:text-base">
            Best Customer Support
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs">
            We provide 24/7 customer support
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;