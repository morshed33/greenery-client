import React, { FC } from "react";
import Lottie from "react-lottie";

interface ISectionHeadProps {
  title: string;
  description?: string;
  extraClass?: string;
}

const animationURL =
  "https://lottie.host/95c2f9a3-5bb0-41fb-ba57-7fe6b6a7c4ee/tejHJdKm8Q.json";

const SectionHead: FC<ISectionHeadProps> = ({
  title,
  description,
  extraClass,
}) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(animationURL)
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
      })
      .catch((error) => {
        console.error("Error fetching animation data:", error);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="relative inline-block">
        <div className="relative z-10 ">
          <h2
            className={`text-4xl md:text-5xl xl:text-6xl font-bold text-gray-800 ${extraClass}`}
          >
            {title}
          </h2>
        </div>
        <div className="absolute z-10 -bottom-6 -right-6 transform translate-x-2 -translate-y-2">
          <Lottie options={defaultOptions} height={80} width={80} />
        </div>
        {description && (
          <p className="text-gray-600 mt-6 text-center">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionHead;
