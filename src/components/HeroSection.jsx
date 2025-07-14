
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
      subtitle: 'Where passion meets performance – join the club!',
    },
    {
      img: 'https://i.ibb.co/ZRngccPR/pexels-pixabay-33703.jpg',
      title: 'Book Your Court Now',
      subtitle: 'World-class tennis, badminton & squash facilities',
    },
    {
      img: 'https://i.ibb.co/xtPXvDhH/pexels-ajaybhargavguduru-863988.jpg',
      title: 'Explore Club Activities',
      subtitle: 'From yoga to tournaments — something for everyone',
    },
    {
      img: 'https://i.ibb.co/GfnFZgjZ/pexels-ajaybhargavguduru-8988.jpg',
      title: 'Train With The Best',
      subtitle: 'Certified trainers and professional coaching sessions',
    },
    {
      img: 'https://i.ibb.co/Kp1BmZ0z/pexels-ajaybhargavgudu8988.jpg',
      title: 'Community & Events',
      subtitle: 'Participate, connect & grow with your community',
    },
  ];









  return (
    <div className="w-full overflow-hidden shadow-2xl rounded-lg ">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay, Keyboard]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[50vh] md:h-[80vh]">
              <img
                src={slide.img}
                alt={slide.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out scale-100 hover:scale-105"
              />
         <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-700/40 to-transparent "></div>
   <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-4 text-blue-100 text-lg md:text-2xl font-light max-w-2xl drop-shadow-sm">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
