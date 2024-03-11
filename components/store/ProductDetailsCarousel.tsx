"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { CMS_CONFIG } from "@/cms.config";

const ProductDetailsCarousel = ({ images }: { images: string[] }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0); // State to track active index

	const handleSlideChange = (swiper: SwiperType) => {
		const realIndex = swiper.realIndex;
		const slidesLength = swiper.slides.length;
		// Calculate the active index based on the direction of the swipe
		const newIndex =
			realIndex < 0
				? slidesLength - 1
				: realIndex >= slidesLength
				? 0
				: realIndex;

		setActiveIndex(newIndex); // Update active index on main image carousel slide change
	};

	return (
		<div className="w-full max-w-[510px] mx-auto  lg:sticky lg:top-[50px]">
			{/* Main Image Carousel */}
			<Swiper
				loop={true}
				spaceBetween={12}
				navigation={false}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className="h-96 w-auto rounded-lg "
				onSlideChange={(swiper) => handleSlideChange(swiper)}
			>
				{images.map((imageUrl, index) => (
					<SwiperSlide key={index}>
						<div className="flex h-full w-full items-center justify-center ">
							<Image
								src={`${CMS_CONFIG.cdn.location}/${imageUrl}`}
								alt={""}
								className="block h-full w-full object-contain"
								quality={100}
								fill
								sizes="(min-width: 1460px) 710px, (min-width: 1100px) 51.18vw, (min-width: 580px) calc(4.8vw + 472px), (min-width: 460px) calc(80vw + 52px), (min-width: 420px) 380px, calc(80vw + 20px)"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Thumbnail */}
			<Swiper
				modules={[FreeMode, Navigation, Thumbs]}
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={12}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				className="thumbs mt-2 h-40 w-full  "
			>
				{images.map((imageUrl, index) => (
					<SwiperSlide key={index}>
						<button className="flex h-full w-full items-center justify-center">
							<Image
								src={`${CMS_CONFIG.cdn.location}/${imageUrl}`}
								alt={`${CMS_CONFIG.cdn.location}/${imageUrl}`}
								className={`block h-full w-full object-contain ${
									index === activeIndex ? "border-2 border-black" : ""
								}`}
								fill
								sizes="(min-width: 1440px) 169px, (min-width: 1100px) calc(12.81vw - 13px), (min-width: 600px) calc(1.25vw + 109px), (min-width: 500px) calc(12.5vw + 44px), (min-width: 460px) 96px, (min-width: 420px) 86px, (min-width: 360px) calc(12.5vw + 26px), calc(100vw - 40px)"
							/>
						</button>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductDetailsCarousel;
