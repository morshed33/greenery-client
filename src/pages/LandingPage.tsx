/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import HeroSection from "@/components/LandingPage/HeroSection";
import ProductList from "@/components/LandingPage/ProductList";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchProducts } from "@/store/slices/productSlice";
import { FC, useEffect } from "react";

interface ILandingPageProps {}

const LandingPage: FC<ILandingPageProps> = (_props) => {

  return (
    <>
      <HeroSection />
      <ProductList />
    </>
  );
};

export default LandingPage;
