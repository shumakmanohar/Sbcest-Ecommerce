"use client"
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CMS_CONFIG } from "@/cms.config";
import Image from "next/image";

const ProductDetailsCarousel = ({ images }: { images: string[] }) => {
  // State to track whether images are loaded
  const [imagesLoaded, setImagesLoaded] = useState(false);


  // Handler for image loading
  const handleImageLoad = () => {
    setImagesLoaded(true)
  };

  return (
    <div className="text-white text-[20px] w-full max-w-[1460px] mx-auto sticky top-[50px] ">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        
        showStatus={false}
        swipeable
        emulateTouch
        thumbWidth={80}
        className="productCarousel"
      >
        {images.map((imageUrl, index) => (
          <div key={index} style={{ display: imagesLoaded ? "block" : "block" }}>
            
            <Image
              src={`${CMS_CONFIG.cdn.location}/${imageUrl}`}
			  className=" object-contain overflow-hidden w-auto h-fit xl:-mt-32"
              alt={`Product Image ${index}`}
             width={861}
             height={861}
              quality={100}
              onLoad={handleImageLoad}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
