/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import HeroSection from "@/components/LandingPage/HeroSection";
import MosaicView from "@/components/LandingPage/MosaicGallery";
import ProductList from "@/components/LandingPage/ProductList";
import { FC } from "react";

interface ILandingPageProps {}

const LandingPage: FC<ILandingPageProps> = (_props) => {
  return (
    <>
      <HeroSection />
      <ProductList />
      <MosaicView/> 
    </>
  );
};

export default LandingPage;
