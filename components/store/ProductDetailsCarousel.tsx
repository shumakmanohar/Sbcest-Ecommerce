"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CMS_CONFIG } from "@/cms.config";

const ProductDetailsCarousel = ({ images }: { images: string[] }) => {
	return (
		<div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
			{JSON.stringify(images)}
			<Carousel
				infiniteLoop={true}
				showIndicators={false}
				showStatus={false}
				swipeable
				emulateTouch
				thumbWidth={70}
				className="productCarousel"
			>
				<img src="/sblogo.png" />
				<img src="/sblogo.png" />
				<img src="/sblogo.png" />
				<img src="/sblogo.png" />
			</Carousel>
		</div>
	);
};

export default ProductDetailsCarousel;
