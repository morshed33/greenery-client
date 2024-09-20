/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import HeroSection from "@/components/LandingPage/HeroSection";
import { FC } from "react";

interface ILandingPageProps {}

const LandingPage: FC<ILandingPageProps> = (_props) => {
  return (
    <>
      <HeroSection />
    </>
  );
};

export default LandingPage;
