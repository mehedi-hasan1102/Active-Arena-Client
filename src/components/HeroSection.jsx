
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import {
//   EffectFade,
//   Navigation,
//   Pagination,
//   Autoplay,
//   Keyboard,
// } from 'swiper/modules';

// export default function HeroSlider() {
//   const slides = [
//     {
//       img: 'https://i.ibb.co/7d9jJw84/Active-Arena-111.webp',
//       title: 'Welcome to ActiveArena',
//       subtitle: 'Where passion meets performance – join the club!',
//     },
//     {
//       img: 'https://i.ibb.co/ZRngccPR/pexels-pixabay-33703.jpg',
//       title: 'Book Your Court Now',
//       subtitle: 'World-class tennis, badminton & squash facilities',
//     },
//     {
//       img: 'https://i.ibb.co/xtPXvDhH/pexels-ajaybhargavguduru-863988.jpg',
//       title: 'Explore Club Activities',
//       subtitle: 'From yoga to tournaments — something for everyone',
//     },
//     {
//       img: 'https://i.ibb.co/GfnFZgjZ/pexels-ajaybhargavguduru-8988.jpg',
//       title: 'Train With The Best',
//       subtitle: 'Certified trainers and professional coaching sessions',
//     },
//     {
//       img: 'https://i.ibb.co/Kp1BmZ0z/pexels-ajaybhargavgudu8988.jpg',
//       title: 'Community & Events',
//       subtitle: 'Participate, connect & grow with your community',
//     },
//   ];









//   return (
//     <div className="w-full overflow-hidden shadow-2xl rounded-lg ">
//       <Swiper
//         spaceBetween={30}
//         effect="fade"
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         keyboard={{ enabled: true }}
//         modules={[EffectFade, Navigation, Pagination, Autoplay, Keyboard]}
//         className="mySwiper"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-[50vh] md:h-[80vh]">
//               <img
//                 src={slide.img}
//                 alt={slide.title}
//                 loading="lazy"
//                 className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out scale-100 hover:scale-105"
//               />
//          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-700/40 to-transparent "></div>
//    <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
//                 <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg">
//                   {slide.title}
//                 </h2>
//                 <p className="mt-4 text-blue-100 text-lg md:text-2xl font-light max-w-2xl drop-shadow-sm">
//                   {slide.subtitle}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
import React from 'react';
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
  const slides = [
    {
      img: 'https://i.ibb.co/7d9jJw84/Active-Arena-111.webp',
      title: 'Welcome to ActiveArena',
      subtitle: 'Where passion meets performance – join the club',
    },
    {
      img: 'https://i.ibb.co/ZRngccPR/pexels-pixabay-33703.jpg',
      title: 'Premium Sports Facilities',
      subtitle: 'World-class courts for tennis, badminton & squash',
    },
    {
      img: 'https://i.ibb.co/xtPXvDhH/pexels-ajaybhargavguduru-863988.jpg',
      title: 'Diverse Activities',
      subtitle: 'From yoga to competitive tournaments',
    },
    {
      img: 'https://i.ibb.co/GfnFZgjZ/pexels-ajaybhargavguduru-8988.jpg',
      title: 'Professional Coaching',
      subtitle: 'Certified trainers for all skill levels',
    },
    {
      img: 'https://i.ibb.co/Kp1BmZ0z/pexels-ajaybhargavgudu8988.jpg',
      title: 'Vibrant Community',
      subtitle: 'Connect and grow with fellow enthusiasts',
    },
  ];

  return (
    <div className="w-full overflow-hidden">
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
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay, Keyboard]}
        className="h-[70vh] md:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-3xl space-y-3 md:space-y-4"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                    {slide.title}
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
        
        {/* Minimal Navigation */}
        <div className="swiper-button-next !text-white/80 hover:!text-white !transition-all !duration-300 after:!text-xl md:after:!text-2xl" />
        <div className="swiper-button-prev !text-white/80 hover:!text-white !transition-all !duration-300 after:!text-xl md:after:!text-2xl" />
        
        {/* Subtle Pagination */}
        <div className="swiper-pagination !bottom-6" />
      </Swiper>
    </div>
  );
}