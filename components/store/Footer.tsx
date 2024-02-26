import Link from 'next/link'
import React from "react";


const Footer = () => {
	
	
	return (
		<footer className="bg-black px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-8 text-white">
				<div className="flex flex-col items-start space-y-4 mb-8 lg:mb-0">
					<div className="text-base sm:text-lg font-semibold">
						Got questions? Call us 24/7!
					</div>
					<div className="text-lg sm:text-xl font-bold">
						<h1 >Arabic Helpdesk</h1>
						<a href="tel:+966 539740365" className='text-[#00adb5] text-base font-semibold'>+966 539740365</a>
					</div>
					
					<div className="text-lg sm:text-xl font-bold">
						<h1 >English Helpdesk</h1>
						<a href="tel:+966 539740365" className='text-[#00adb5] text-base font-semibold'>+966 539740365</a>
					</div>
					<div className="text-sm">
						Waleed Centre,
						<br className="hidden sm:inline" /> Khalid Waleed Street Jeddah,
						<br className="hidden sm:inline" />
						Kingdom of Saudi Arabia
					</div>
					<div className="flex space-x-2 sm:space-x-4"></div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
					<div className="flex flex-col space-y-2">
						<div className="text-lg font-semibold">Customer service</div>
						<Link className="text-sm" href="#">
							Orders
						</Link>

						<Link className="text-sm" href="#">
							Addresses
						</Link>
						<Link className="text-sm" href="#">
							Account details
						</Link>
						<Link className="text-sm" href="#">
							Help & Support
						</Link>
					</div>
					<div className="flex flex-col space-y-2">
						<div className="text-lg font-semibold">Useful links</div>
						<Link className="text-sm" href="#">
							Features
						</Link>
						<Link className="text-sm" href="#">
							About
						</Link>
						<Link className="text-sm" href="#">
							Contact
						</Link>
						<Link className="text-xs" href="#">
							Terms of use
						</Link>
					</div>
					<div className="flex flex-col space-y-2">
						<div className="text-lg font-semibold">Delivery</div>
						<Link className="text-sm" href="#">
							How it Works
						</Link>
						<Link className="text-sm" href="#">
							Free Delivery
						</Link>
						<Link className="text-sm" href="#">
							FAQ
						</Link>
					</div>
				</div>
			</div>
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center py-4 text-white">
				<div className="text-sm">
					© 2024 SBcest | All Rights Reserved | Developed & Desinged by: <Link href={'#'}>oflyne.co</Link>
				</div>
				
			</div>
		</footer>
	);
};

export default Footer;
