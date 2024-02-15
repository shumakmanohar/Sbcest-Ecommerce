import { CMS_CONFIG } from "@/cms.config";
import Image from "next/image";

const logos = [
	{
		id: 1,
		logo: "/logo4.svg",
		name: "Spotify",
	},
	{
		id: 2,
		logo: "/logo6.svg",
		name: "Paypal Logo",
	},
	{
		id: 3,
		logo: "/logo17.svg",
		name: "Spotify",
	},
	{
		id: 4,
		logo: "/logo18.svg",
		name: "Spotify",
	},
	{
		id: 5,
		logo: "/logo5.svg",
		name: "Spotify",
	},
	{
		id: 6,
		logo: "/logo16.svg",
		name: "Spotify",
	},
	{
		id: 7,
		logo: "/logo13.svg",
		name: "Spotify",
	},
	{
		id: 8,
		logo: "/logo9.svg",
		name: "Spotify",
	},
	{
		id: 9,
		logo: "/logo20.svg",
		name: "Spotify",
	},
	{
		id: 10,
		logo: "/logo12.svg",
		name: "AMD",
	},
];

const LogoItem = ({ logo, name }: { logo: string; name: string }) => {
	return (
		<div className="p-4 sm:p-5 rounded-lg border border-black dark:border-gray-900 group">
			<Image
				src={`${CMS_CONFIG.staticImages.location}${logo}`}
				width={80}
				height={50}
				alt={name}
				className="sm:h-8  ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
			/>
		</div>
	);
};

const LogoCloud = () => {
	return (
		<section className="py-20 bg-[#f7f7f7] max-w-[1460px] w-full mx-auto">
			<div className="max-w-8xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-12">
				<div className="text-center space-y-6 max-w-2xl mx-auto">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-black capitalize">
						Trusted by{" "}
					</h1>
				</div>
				<div className="flex justify-center flex-wrap gap-4">
					{logos.map((logo) => (
						<LogoItem key={logo.id} {...logo} />
					))}
				</div>
			</div>
		</section>
	);
};

export default LogoCloud;
