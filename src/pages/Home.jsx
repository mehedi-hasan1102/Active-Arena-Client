
import { Helmet } from "react-helmet-async";
import AdditionalSections from "../Components/AdditionalSections";
import HeroSection from "../Components/HeroSection";

import NewPlantsSection from "../Components/NewPlantsSection";
import PromotionalOffers from "../Components/PromotionalOffers";
// import TopMistakesSection from "../Components/TopMistakesSection";


const Home = () => {
  return (
    < >
      <Helmet>
        <title>Home - ActiveArena</title>
      </Helmet>
      <HeroSection />
      <NewPlantsSection />
      <PromotionalOffers />
       <AdditionalSections />
      {/* <TopMistakesSection /> */}

    </>
  );
};

export default Home;
