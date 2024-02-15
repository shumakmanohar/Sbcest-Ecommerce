import { CMS_CONFIG } from "@/cms.config";
import React from "react";

const GridLayout = () => {
	return (
		<div>
			<div className="w-full py-4 container  gap-4 min-h-[30vh] grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 ">
				<div className="row-span-2  flex items-center md:p-4">
					<video autoPlay loop muted className="h-full">
						<source
							src={`${CMS_CONFIG.staticImages.location}/xlarge_2x.mp4`}
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>
				<div className="md:p-2">
					<img
						alt="Watch Series 9"
						src={`${CMS_CONFIG.staticImages.location}/iw1.jpg`}
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
				<div className="md:p-2">
					<img
						alt="Watch Series 9"
						src={`${CMS_CONFIG.staticImages.location}/iw1.jpg`}
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default GridLayout;
