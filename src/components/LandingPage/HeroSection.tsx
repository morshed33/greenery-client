/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import { FaLeaf } from "react-icons/fa";

// Custom Arrow Component for Carousel
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-600 z-10"
    >
      <FaLeaf size={32} className="rotate-180" />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-600 z-10"
    >
      <FaLeaf size={32} />
    </div>
  );
};

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section className="relative w-full h-[70dvh] text-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://videos.pexels.com/video-files/3179187/3179187-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to Darken Video */}
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

      {/* Carousel */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <Slider {...settings}>
          <div className="px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white transition-all duration-500 transform hover:scale-105">
              Bring Nature Home with Greenery!
            </h1>
            <p className="text-lg md:text-xl text-white my-4">
              Shop the best indoor plants to make your home greener.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 mt-4 transition-transform transform hover:scale-110"
            >
              Explore Plants
            </Button>
          </div>
          <div className="px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white transition-all duration-500 transform hover:scale-105">
              Enhance Your Living Space
            </h1>
            <p className="text-lg md:text-xl text-white my-4">
              Discover the perfect plants for your interior.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 mt-4 transition-transform transform hover:scale-110"
            >
              Browse Collection
            </Button>
          </div>
          <div className="px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white transition-all duration-500 transform hover:scale-105">
              Add Life to Your Home
            </h1>
            <p className="text-lg md:text-xl text-white my-4">
              Create a vibrant atmosphere with our green plants.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 mt-4 transition-transform transform hover:scale-110"
            >
              Shop Now
            </Button>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HeroSection;
