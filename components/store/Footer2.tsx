import { MountainIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";

const Footer2 = () => {
	return (
		<div className="bg-gray-800 text-white py-12 mt-8">
			<div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div className="flex flex-col items-center md:items-start">
					<MountainIcon className="h-8 w-8 mb-4" />
					<p className="text-center md:text-left text-sm">
						Acme Inc is a leading provider of business solutions across various
						domains. We help businesses grow with our innovative and effective
						solutions.
					</p>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h3 className="font-bold mb-2">Navigation</h3>
					<nav className="space-y-1 text-sm">
						<Link className="hover:underline" href="#">
							Home
						</Link>
						<Link className="hover:underline" href="#">
							About Us
						</Link>
						<Link className="hover:underline" href="#">
							Services
						</Link>
						<Link className="hover:underline" href="#">
							Portfolio
						</Link>
						<Link className="hover:underline" href="#">
							Blog
						</Link>
						<Link className="hover:underline" href="#">
							Contact
						</Link>
					</nav>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h3 className="font-bold mb-2">Follow Us</h3>
					<div className="flex flex-col space-x-4">
						<Link href="#">
							<FaFacebook className="h-6 w-6" />
						</Link>
					</div>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h3 className="font-bold mb-2">Contact Us</h3>
					<p className="text-sm mb-2">1234 Street, City, State, Country</p>
					<p className="text-sm mb-2">Phone: (123) 456-7890</p>
					<p className="text-sm mb-2">Email: info@acme.com</p>
					<form className="w-full max-w-sm mt-4">FORM</form>
				</div>
			</div>
			<div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
				<p>© 2024 Acme Inc. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer2;
