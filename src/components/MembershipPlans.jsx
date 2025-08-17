import React from 'react';

const membershipPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 500,
    duration: '1 Month',
    benefits: [
      'Access to 2 courts per week',
      'Free water bottle',
      'Basic support',
    ],
  },
  {
    id: 2,
    name: 'Standard Plan',
    price: 1200,
    duration: '3 Months',
    benefits: [
      'Access to 5 courts per week',
      'Free T-shirt',
      'Priority support',
    ],
  },
  {
    id: 3,
    name: 'Premium Plan',
    price: 4500,
    duration: '12 Months',
    benefits: [
      'Unlimited court access',
      'Free kit & merchandise',
      'Personal coach sessions',
      'VIP support',
    ],
  },
];

const MembershipPlans = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-400">💳 Membership Plans</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-zinc-900 shadow-md dark:shadow-green-800/20 rounded-md p-6 flex flex-col justify-between transition hover:scale-105"
          >
            <div>
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-2">{plan.name}</h3>
              <p className="text-gray-800 dark:text-green-200 mb-4 text-lg">
                ৳{plan.price} / {plan.duration}
              </p>
              <ul className="text-gray-700 dark:text-green-300 mb-4 list-disc list-inside space-y-1">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => alert(`Subscribe to ${plan.name}`)}
              className="mt-auto w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md font-semibold transition"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipPlans;
