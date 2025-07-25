
import React from "react";

const LocationSection = () => {
  return (
    <section
      id="location"
      className=" mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-lg "
    >
      <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 text-center mb-8">
        Location
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        {/* Address */}
        <div className="text-blue-900 dark:text-blue-100">
          <h3 className="text-2xl font-semibold mb-4">ActiveArena Sports Club</h3>
          <p className="mb-2">123 Sports Avenue, Greenfield City,</p>
          <p className="mb-2">Dhaka, Bangladesh - 1212</p>
          <p className="mb-2">Phone: +880 1700-123456</p>
          <p className="mb-6">Email: info@activearena.com</p>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=123+Sports+Avenue,+Greenfield+City,+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Navigate on Google Maps
          </a>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="ActiveArena Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.912312005212!2d90.39401271541404!3d23.750903094163033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0cc2304a3%3A0xf5f6ad0121a79190!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
