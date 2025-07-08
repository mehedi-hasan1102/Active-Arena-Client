
import { Helmet } from "react-helmet-async";

import HeroSection from "../Components/HeroSection";
import AboutClub from '../Components/AboutClub';
import LocationSection from '../Components/LocationSection';
import PromotionsSection from "../Components/PromotionsSection";






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
