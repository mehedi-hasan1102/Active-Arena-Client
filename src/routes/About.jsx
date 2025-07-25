import { Helmet } from "react-helmet-async";
import React from "react";
import { FaFutbol } from "react-icons/fa";

const About = () => {
  return (
    <section
      className="mt-8 mx-auto px-6 py-12 rounded-3xl shadow-md
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      <Helmet>
        <title>About - ActiveArena Sports Club Management System</title>
      </Helmet>

      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <FaFutbol
            className="text-blue-700 dark:text-blue-400 text-5xl"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-400 mb-3">
          About ActiveArena
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          ActiveArena is a comprehensive Sports Club Management System designed to facilitate efficient administration and seamless user engagement for a single sports club. Our platform integrates user registration, membership administration, court and session bookings, payment processing, and administrative oversight in one unified solution.
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-gray-700 dark:text-gray-300 text-base leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Streamlined Club Operations
          </h2>
          <p>
            ActiveArena empowers club administrators and members by offering role-based dashboards tailored to the distinct needs of users, members, and administrators. Through intuitive interfaces, users can effortlessly reserve courts, manage bookings, and monitor payment statuses, while administrators maintain full control over approvals, announcements, court management, and coupon administration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
            User-Centric Experience
          </h2>
          <p>
            Designed with responsiveness and accessibility as a priority, ActiveArena delivers a seamless experience across desktop, tablet, and mobile devices. The system supports real-time updates, custom notifications, and secure authentication, ensuring a trustworthy and engaging environment for all stakeholders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Our Mission
          </h2>
          <p>
            Our mission is to foster vibrant sports communities by simplifying club management and enhancing member participation. ActiveArena aims to be the definitive platform that empowers sports clubs to operate efficiently while providing members with an exceptional experience.
          </p>
        </section>

        <p
          className="italic text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mt-8"
          aria-label="Join us and play together"
        >
          <FaFutbol aria-hidden="true" /> Join us, and let’s play together.
        </p>
      </div>
    </section>
  );
};

export default About;
