
import { FaFacebookF, FaInstagram, FaTwitter, FaTrophy, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floating = {
    float: {
      y: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8 rounded-b-none rounded-xl">
      {/* Floating decorative elements */}
      <motion.div 
        animate="float"
        variants={floating}
        className="absolute -left-20 top-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl"
      />
      <motion.div 
        animate="float"
        variants={floating}
        transition={{ delay: 2 }}
        className="absolute -right-20 bottom-1/4 w-64 h-64 rounded-full bg-cyan-200/30 dark:bg-cyan-900/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={item} className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400 group"
            >
              <motion.span
                whileHover={{ rotate: 15 }}
                className="inline-block"
              >
                <FaTrophy className="text-yellow-500 text-3xl" />
              </motion.span>
              <motion.span
                whileHover={{ 
                  color: ["#059669", "#0d9488", "#059669"],
                  transition: { duration: 1.5, repeat: Infinity }
                }}
              >
                Active<span className="text-cyan-500">Arena</span>
              </motion.span>
            </Link>
            <p className="text-emerald-700/90 dark:text-emerald-300/90 leading-relaxed">
              Elevating sports experiences through world-class facilities and community engagement.
            </p>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'Courts', 'About', 'Contact', 'Support'].map((link, index) => (
                <motion.li 
                  key={link}
                  variants={item}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="flex items-center gap-2 text-emerald-700 hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200 transition-colors group"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <motion.li 
                variants={item}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-emerald-700 dark:text-emerald-300">
                  123 Sports Avenue, Dhaka
                </span>
              </motion.li>
              <motion.li 
                variants={item}
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <FaPhone className="text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-300">+880 1700-123456</span>
              </motion.li>
              <motion.li 
                variants={item}
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-300">info@activearena.com</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, url: "#", color: "bg-blue-600 hover:bg-blue-700" },
                { icon: <FaInstagram />, url: "#", color: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700" },
                { icon: <FaTwitter />, url: "#", color: "bg-sky-500 hover:bg-sky-600" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  variants={item}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.url}
                  className={`${social.color} p-3 rounded-full text-white shadow-md hover:shadow-lg transition-all`}
                  aria-label={`${social.icon.type.name} link`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent dark:via-emerald-700/30 my-8"
        />

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-emerald-700/90 dark:text-emerald-400/90"
        >
          <div>
            &copy; {currentYear} ActiveArena. All rights reserved.
          </div>
          
          
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;