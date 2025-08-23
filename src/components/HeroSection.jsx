


// image bb image 


//   const slides = [
//     {
//       img: 'https://i.ibb.co/7d9jJw84/Active-Arena-111.webp',
//       title: 'Welcome to ActiveArena',
//       subtitle: 'Where passion meets performance – join the club',
//     },
//     {
//       img: 'https://i.ibb.co/ZRngccPR/pexels-pixabay-33703.jpg',
//       title: 'Premium Sports Facilities',
//       subtitle: 'World-class courts for tennis, badminton & squash',
//     },
//     {
//       img: 'https://i.ibb.co/xtPXvDhH/pexels-ajaybhargavguduru-863988.jpg',
//       title: 'Diverse Activities',
//       subtitle: 'From yoga to competitive tournaments',
//     },
//     {
//       img: 'https://i.ibb.co/GfnFZgjZ/pexels-ajaybhargavguduru-8988.jpg',
//       title: 'Professional Coaching',
//       subtitle: 'Certified trainers for all skill levels',
//     },
//     {
//       img: 'https://i.ibb.co/Kp1BmZ0z/pexels-ajaybhargavgudu8988.jpg',
//       title: 'Vibrant Community',
//       subtitle: 'Connect and grow with fellow enthusiasts',
//     },
//   ];


import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
} from 'swiper/modules';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: 'https://i.ibb.co/7d9jJw84/Active-Arena-111.webp',
      title: 'Welcome to ActiveArena',
      subtitle: 'Where passion meets performance – join the club',
      badge: 'New Season'
    },
    {
      img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      title: 'Premium Sports Facilities',
      subtitle: 'World-class courts for tennis, badminton & squash',
      badge: 'Facilities'
    },
    {
      img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      title: 'Diverse Activities',
      subtitle: 'From yoga to competitive tournaments',
      badge: 'Activities'
    },
    {
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      title: 'Professional Coaching',
      subtitle: 'Certified trainers for all skill levels',
      badge: 'Training'
    },
    {
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      title: 'Vibrant Community',
      subtitle: 'Connect and grow with fellow enthusiasts',
      badge: 'Community'
    },
  ];

  return (
    <div className="h-[50vh] md:h-[70vh] mt-7 relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <Swiper
        spaceBetween={30}
        
        effect="fade"
        speed={1000}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-2.5 !h-2.5 !mx-1.5',
          bulletActiveClass: '!bg-emerald-400 !w-3 !h-3',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[EffectFade, Navigation, Pagination, Autoplay, Keyboard]}
        className="h-[70vh] md:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full  h-[50vh] md:h-[70vh]">
              <img
                src={slide.img}
                alt={slide.title}
                loading="lazy"
                className="w-full h-[50vh] md:h-[70vh]  object-cover object-center "
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 40
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-3xl space-y-3 md:space-y-4"
                >
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 mb-4">
                    {slide.badge}
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                    {slide.title}
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-300 text-lg md:text-xl font-light max-w-2xl"
                  >
                    {slide.subtitle}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="swiper-button-next !text-white/80 hover:!text-white !transition-all !duration-300 after:!text-xl md:after:!text-2xl !right-8" />
        <div className="swiper-button-prev !text-white/80 hover:!text-white !transition-all !duration-300 after:!text-xl md:after:!text-2xl !left-8" />
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-8" />
      </Swiper>

      {/* Animated background elements (like AboutClub) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}