
import React from "react";

const AboutClub = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-16 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4">
          About Our Sports Club
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
          At <span className="font-semibold text-blue-600">ActiveArena</span>, our
          mission is to foster a vibrant sports community where passion meets
          excellence. We provide world-class facilities and programs to
          empower athletes of all levels.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* History */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            Our History
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded in 1995, ActiveArena has grown from a small community club to
            one of the leading sports facilities in the region. We have hosted
            numerous tournaments and continue to nurture talent across various
            sports including tennis, badminton, squash, and more.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to provide an inclusive and motivating environment
            for athletes to develop their skills, promote healthy lifestyles,
            and build a strong community spirit. We believe in excellence,
            teamwork, and lifelong sportsmanship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
