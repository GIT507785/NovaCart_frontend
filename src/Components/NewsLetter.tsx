import type React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../API/api";
import { Loader } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/user/subscribe`,
        {
          email: email.trim(),
        }
      );

      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 mt-10 sm:mt-20">

      <div className="text-center max-w-3xl mx-auto">

        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium capitalize">
          Subscribe now & get 20% off
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-6">
          Subscribe to our newsletter and get exclusive offers,
          new product updates and special discounts directly in
          your inbox.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="
            w-full
            max-w-xl
            mx-auto
            my-6
            flex
            items-center
            border
            border-gray-300
            rounded-xl
            overflow-hidden
            focus-within:border-black
            transition
          "
        >

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
            className="
              flex-1
              min-w-0
              px-3
              sm:px-4
              py-3
              sm:py-4
              outline-none
              text-sm
              text-gray-700
              disabled:bg-gray-100
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              bg-black
              text-white
              px-4
              sm:px-8
              py-3
              sm:py-4
              text-xs
              sm:text-sm
              font-medium
              hover:bg-gray-800
              transition
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
              whitespace-nowrap
            "
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "SUBSCRIBE"
            )}
          </button>

        </form>

      </div>

    </section>
  );
};

export default NewsLetter;