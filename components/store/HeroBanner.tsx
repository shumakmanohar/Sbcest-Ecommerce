"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import { CMS_CONFIG } from "@/cms.config";

const HeroBanner = () => {
	return (
		<div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
			<Carousel
				autoPlay={true}
				interval={5000}
				infiniteLoop={true}
				showThumbs={false}
				showIndicators={false}
				showStatus={false}
				renderArrowPrev={(clickHandler, hasPrev) => (
					<div
						onClick={clickHandler}
						className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
					>
						<BiArrowBack className="text-sm md:text-lg" />
					</div>
				)}
				renderArrowNext={(clickHandler, hasNext) => (
					<div
						onClick={clickHandler}
						className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
					>
						<BiArrowBack className="rotate-180 text-sm md:text-lg" />
					</div>
				)}
			>
				{/* Video Slide */}
				<div className="video_container">
					<video
						autoPlay
						loop
						muted
						className="w-full h-auto object-cover"
						poster="/video-poster.jpg" // Add a poster image for browsers that don't support video autoplay
					>
						<source
							src={`${CMS_CONFIG.cdn.location}/vid_surf_pro.mp4`}
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>

				<div className="video_container1">
					<video
						autoPlay
						loop
						muted
						className="w-full h-auto object-cover"
						poster="/video-poster.jpg" // Add a poster image for browsers that don't support video autoplay
					>
						<source
							src={`${CMS_CONFIG.cdn.location}/ExclusiveStore.mp4`}
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>

				<div className="image_container">
					<img
						src="/slide-2.png"
						className="aspect-[16/10] md:aspect-auto object-cover"
					/>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>

				<div className="image_container">
					<img
						src={`${CMS_CONFIG.cdn.location}/slide-3.png`}
						className="aspect-[16/10] md:aspect-auto object-cover"
					/>
					<div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
						Shop now
					</div>
				</div>
			</Carousel>
		</div>
	);
};

export default HeroBanner;
