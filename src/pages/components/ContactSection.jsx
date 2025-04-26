// src/layout/home/ContactSection.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ContactSection() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    toast.success("📬 Message sent successfully!");
    reset();
    setTimeout(() => navigate("/signup"), 1000);
  };

  return (
    <section
      id="contact"
      className="
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-800
        py-20 px-6 font-cormorant text-[#023E8A]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-10 transition-colors duration-300">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Let’s talk about your event</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 transition-colors duration-300">
              We’d love to hear how we can help you plan the perfect event.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <div>
              <h3 className="font-semibold text-[#0077B6] dark:text-[#90E0EF] flex items-center gap-2 transition-colors duration-300">
                <FiMapPin /> Our Location
              </h3>
              <p>401 Broadway, 24th Floor, Cloud View, London</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#0077B6] dark:text-[#90E0EF] flex items-center gap-2 transition-colors duration-300">
                <FiMail /> Contact Emails
              </h3>
              <p>info@youreventplatform.com</p>
              <p>support@youreventplatform.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#0077B6] dark:text-[#90E0EF] flex items-center gap-2 transition-colors duration-300">
                <FiPhone /> Phone
              </h3>
              <p>+44 20 1234 5678</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            bg-[#f9fdff] dark:bg-gray-800
            p-8 rounded-lg shadow-md space-y-5
            transition-colors duration-300
          "
        >
          <h3 className="text-2xl font-bold text-center mb-4 dark:text-white">
            Send us a Message
          </h3>

          {["fullName","email","phone","message"].map((field, idx) => {
            const label = {
              fullName: "Full Name*",
              email: "Email*",
              phone: "Phone*",
              message: "Message*",
            }[field];
            const type = field==="message" ? null : field==="email" ? "email" : "text";
            const props = type
              ? { type }
              : {};
            return (
              <div key={idx}>
                <label className="block text-sm font-medium text-[#023E8A] dark:text-[#CAF0F8] mb-1 transition-colors duration-300">
                  {label}
                </label>
                {type ? (
                  <input
                    {...register(field, { required: `${label} is required` })}
                    placeholder={field==="phone" ? "+44 20 1234 5678" : `Your ${field}`}
                    className="
                      w-full p-3 border border-gray-300 dark:border-gray-600
                      rounded-lg focus:ring-2 focus:ring-[#0077B6]
                      bg-white dark:bg-gray-700
                      text-black dark:text-white
                      transition-colors duration-300
                    "
                  />
                ) : (
                  <textarea
                    rows="4"
                    {...register(field, { required: `${label} is required` })}
                    placeholder="Type your message..."
                    className="
                      w-full p-3 border border-gray-300 dark:border-gray-600
                      rounded-lg focus:ring-2 focus:ring-[#0077B6]
                      bg-white dark:bg-gray-700
                      text-black dark:text-white
                      transition-colors duration-300
                    "
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field].message}</p>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={!isValid}
            className="
              w-full flex items-center justify-center gap-2
              bg-[#0077B6] hover:bg-[#023E8A] text-white font-bold
              py-3 rounded-lg transition-colors duration-300
            "
          >
            <FiSend /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
