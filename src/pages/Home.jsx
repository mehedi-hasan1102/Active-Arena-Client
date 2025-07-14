
import { Helmet } from "react-helmet-async";

import HeroSection from "../components/HeroSection";
import AboutClub from '../components/AboutClub';
import LocationSection from '../components/LocationSection';
import PromotionsSection from "../components/PromotionsSection";






const Home = () => {
  return (
    < >
      <Helmet>
        <title>Home - ActiveArena</title>
      </Helmet>
      <HeroSection />
     <AboutClub />
<LocationSection />   
<PromotionsSection /> 
       
    

    </>
  );
};

export default Home;
