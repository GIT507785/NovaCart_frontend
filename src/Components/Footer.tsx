import { Link } from "react-router-dom";
import { assets } from "../assets/assets/assets";

const Footer = () => {
  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Collection", path: "/collection" },
  ];

  return (
    <footer className="w-full mt-10 sm:mt-20 px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 text-gray-500">

      {/* Main Footer */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          gap-10
          md:gap-16
          border-b
          border-gray-300
          pb-8
        "
      >

        {/* Logo + Description */}
        <div className="w-full md:max-w-96">

          <Link to="/">
            <img
              src={assets.logo}
              className="w-36 sm:w-44 md:w-48"
              alt="NovaCart"
            />
          </Link>

          <p className="mt-5 text-xs sm:text-sm leading-6 text-gray-500">
            Discover premium products at NovaCart. We provide
            quality products, easy shopping and reliable customer
            support for a better online shopping experience.
          </p>

        </div>

        {/* Links + Contact */}
        <div
          className="
            w-full
            md:w-auto
            flex
            flex-row
            justify-between
            md:justify-end
            gap-10
            sm:gap-20
          "
        >

          {/* Company */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-800 text-sm sm:text-base">
              Company
            </h2>

            <ul className="text-xs sm:text-sm space-y-3">

              {companyLinks.map((item) => (
                <li key={item.path}>
                  <Link 
                    onClick={()=>window.scrollTo({top:0 , behavior:"smooth"})}
                    to={item.path}
                    className="hover:text-black transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-800 text-sm sm:text-base">
              Get in Touch
            </h2>

            <div className="text-xs sm:text-sm space-y-3">

              <p>
                +92-3423135480
              </p>

              <a
                href="mailto:haseeb480@gmail.com"
                className="hover:text-black transition-colors duration-200"
              >
                haseeb480@gmail.com
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="py-5 text-center">

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
          Copyright © 2026{" "}
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-black"
          >
            NovaCart
          </Link>
          . All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;