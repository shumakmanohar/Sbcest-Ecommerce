import { CMS_CONFIG } from "@/cms.config";
import { Button } from "../ui/button";

const AppleBanner = () => {
	return (
		<div
			key="1"
			className="bg-black relative overflow-hidden max-w-[1460px] w-full mx-auto max-h-[850px]"
		>
			<div className="container mx-auto px-2 lg:px-8">
				<div className="flex flex-col items-center justify-center py-10 lg:py-18">
					<div className="text-center flex items-center">
						<img
							src={`${CMS_CONFIG.staticImages.location}/app_logo.png`}
							alt="apple"
							style={{ height: "22px" }}
						/>
						<h1 className="text-white ml-1 font-bold text-2xl">Watch</h1>
					</div>
					<span className="text-red-500 text-xs ml-2 mt-1">Series 9</span>
					<h2 className="text-1xl lg:text-2xl font-bold text-white mt-1">
						Smarter. Brighter. Mightier.
					</h2>
					<p className="text-sm text-[#00adb5] mt-4">
						Exlusive at Sbcest Store
					</p>
					<div className="mt-6">
						<Button className=" bg-[#433e3e] hover:bg-[#00adb5] text-white font-medium py-2 px-6 rounded-full transition duration-300">
							Order Now
						</Button>
					</div>
					<div className=" lg:mt-0 flex justify-center w-full">
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
		</div>
	);
};

export default AppleBanner;
