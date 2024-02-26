import Link from 'next/link'
import { Button } from "../ui/button";
import { CMS_CONFIG } from "@/cms.config";
import { JSX, SVGProps } from 'react';
import Image from 'next/image';

const Support = () => {
	return (
		<section
			key="1"
			className="max-w-[1460px] w-full mx-auto px-4 sm:px-6 lg:px-6 py-10"
		>
			<div className="flex flex-col sm:flex-row justify-between items-center mb-2">
				<h2 className="text-3xl font-semibold">Support</h2>
			</div>
			<span className="flex items-center max-w-[1460px] w-full mx-auto mb-6">
				<span className="h-px flex-1 bg-gray-300"></span>

				<span className="h-px flex-1 bg-gray-300"></span>
			</span>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-[#f8f8f8] p-6 rounded-lg flex flex-col sm:flex-row items-center">
					<div>
						<h3 className="text-2xl font-bold mb-2">One-on-One with SBcest</h3>
						<h4 className="text-lg  mb-4">Your personal helpdesk.</h4>
						<p className="text-gray-600 mb-4 text-xs w-1/2">
							From finding the perfect product to quickly resolving queries,
							we're always ready to help.
						</p>
						<Button className=" bg-[#433e3e] hover:bg-[#00adb5] text-white text-xs py-1 px-2 rounded-full transition duration-300">
							Let's Chat
						</Button>
					</div>
					<Image
						alt="Placeholder"
						className="mt-6 sm:mt-2 mb-2 sm:ml-6 rounded-lg object-cover  transform transition-transform duration-500 hover:scale-105"
						height={250}
						src={`${CMS_CONFIG.staticImages.location}/help1.webp`}
						style={{
							aspectRatio: "200/200",
							objectFit: "cover",
						}}
						width={250}
						quality={100}
					/>
				</div>
				<div className="bg-[#f8f8f8] p-6 rounded-lg flex flex-col sm:flex-row items-center">
					<div>
						<h3 className="text-2xl font-bold mb-2">SBcest Service </h3>
						<h4 className="text-lg  mb-4">
							Our technical team is here to help
						</h4>
						<p className="text-gray-600 mb-4 text-xs w-1/2">
							Feel free to reach out to us for further assistance or during any
							inconvenience. All of our staffs are always happy to assist you.
						</p>
						<Button className=" bg-[#433e3e] hover:bg-[#00adb5] text-white text-xs py-1 px-2 rounded-full transition duration-300">
							Get in touch
						</Button>
						<div className="mt-4" />
					</div>
					<Image
						alt="Placeholder"
						className="mt-6 sm:mt-2 mb-2 sm:ml-6 rounded-lg object-cover  transform transition-transform duration-500 hover:scale-105"
						height={250}
						src={`${CMS_CONFIG.staticImages.location}/help2.webp`}
						style={{
							aspectRatio: "200/200",
							objectFit: "cover",
						}}
						quality={100}
						width={250}
					/>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-b border-gray-200 divide-x divide-gray-200">
				<Link
					className="text-black text-sm px-2 mt-4 sm:mt-2 mb-2  transform transition-transform duration-500 hover:scale-105"
					href="#"
				>
					Product help
					<ArrowRightIcon className="inline-block" />
				</Link>
				<Link
					className="text-black text-sm px-2 mt-4 sm:mt-2 mb-2  transform transition-transform duration-500 hover:scale-105"
					href="#"
				>
					Shopping FAQ
					<ArrowRightIcon className="inline-block" />
				</Link>
				<Link
					className="text-black text-sm px-2 mt-4 sm:mt-2 mb-2  transform transition-transform duration-500 hover:scale-105"
					href="#"
				>
					Troubleshooting
					<ArrowRightIcon className="inline-block" />
				</Link>
				<Link
					className="text-black text-sm px-2 mt-4 sm:mt-2 mb-2  transform transition-transform duration-500 hover:scale-105"
					href="#"
				>
					Protection plan
					<ArrowRightIcon className="inline-block" />
				</Link>
			</div>
		</section>
	);
};


function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</svg>
	);
}

export default Support;
