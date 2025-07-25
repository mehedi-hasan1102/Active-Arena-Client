
import React from "react";

const coupons = [
  { code: "ABC", discount: 5 },
  { code: "SUMMER20", discount: 20 },
  { code: "WELCOME10", discount: 10 },
  { code: "SPORTS5", discount: 5 },
];

const PromotionsSection = () => {
  return (
    <section
      id="promotions"
      className=" mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300"
    >
      <h2 className="text-4xl font-extrabold text-center text-blue-900 dark:text-blue-300 mb-12">
        Special Promotions & Discount Coupons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {coupons.map(({ code, discount }) => (
          <div
            key={code}
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
              Coupon Code
            </p>
            <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 tracking-widest">
              {code}
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Get <span className="font-bold">{discount}%</span> OFF
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;
