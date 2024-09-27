import { useAppSelector } from "@/store/hook";
import SectionHead from "../common/SectionHead";

const MosaicView = () => {
  const products = useAppSelector((state) => state.products.products);
  const last10ProductsImages = products
    .slice(0, 10)
    .map((product) => product.image);
    
  return (
    <div className="flex flex-col items-center max-h-[calc(screen_dvh-65px)] overflow-hidden pb-20 px-6 sm:px-10 md:px-20 bg-green-100">
      <div className="sticky top-0 z-10 w-full bg-green-100 py-4 px-6 text-center">
        <SectionHead
          title="New Arrivals."
          description="Check out our new arrivals."
        />
      </div>
      <div className="columns-4 gap-1 p-4">
        {last10ProductsImages.map((url, index) => (
          <div
            key={index}
            className="mb-1 overflow-hidden rounded-lg break-inside-avoid group"
          >
            <img
              src={url}
              alt={`Mosaic Item ${index}`}
              className="w-full h-auto object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-125 group-hover:brightness-50"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MosaicView;
