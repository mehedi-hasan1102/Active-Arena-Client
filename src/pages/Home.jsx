import { Helmet } from "react-helmet-async";
import HeroSection from "../components/HeroSection";
import FeaturedCourts from "../components/FeaturedCourts";
import UpcomingEvents from "../components/UpcomingEvents";
import PromotionsSection from "../components/PromotionsSection";
import RecentActivities from "../components/RecentActivities";
// import MembershipPlans from "../components/MembershipPlans";
import Testimonials from "../components/Testimonials";
import AboutClub from '../components/AboutClub';
import Newsletter from "../components/Newsletter";
import LocationSection from '../components/LocationSection';
// import GallerySection from "../components/GallerySection";

const Home = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Home - ActiveArena</title>
      </Helmet>

      {/* 1. Hero Section - Eye-catching, call-to-action */}
      <HeroSection />

      {/* 2. Featured Courts - Immediate highlight of main offerings */}
      <FeaturedCourts />

      {/* 3. Upcoming Events - Keep users engaged with what’s next */}
      <UpcomingEvents />

      {/* 4. Promotions - Special deals to encourage booking */}
      <PromotionsSection />

      {/* 5. Recent Activities - Show community & activity */}
      <RecentActivities />

      {/* 6. Testimonials - Build trust & social proof */}
      <Testimonials />

      {/* 7. About Club - Story & mission, after credibility established */}
      <AboutClub />

      {/* 8. Membership Plans - Optional for conversions */}
      {/* <MembershipPlans /> */}

      {/* 9. Gallery - Visual appeal & highlight club vibe */}
      {/* <GallerySection /> */}

      {/* 10. Newsletter - Capture leads / stay connected */}
      <Newsletter />

      {/* 11. Location - At the end for users ready to visit */}
      <LocationSection />

      {/* Footer - Already included in layout */}
    </div>
  );
};

export default Home;
