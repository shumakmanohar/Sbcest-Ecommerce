"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrSearch } from "react-icons/gr";
import CartIcon from "./CartIcon";
import DynamicUserIcon from "./DynamicUserIcon";
import { Search } from "lucide-react";
import SearchContainer from "./SearchContainer";
import { Separator } from "../ui/separator";
import { MdComputer } from "react-icons/md";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { CiDesktopMouse1 } from "react-icons/ci";
import { GiSmartphone } from "react-icons/gi";
import { IoWatchOutline } from "react-icons/io5";
import { PiGameControllerLight } from "react-icons/pi";
import { CiSquareMore } from "react-icons/ci";
import { useClerk } from "@clerk/clerk-react";

const StoreNavLinks = [
	{
		label: "Mouse",
		link: "/products",
		icon: <CiDesktopMouse1 size={30} />,
	},
	{
		label: "SmartPhone",
		link: "/products",
		icon: <GiSmartphone size={30} />,
	},
	{
		label: "Watches",
		link: "/products",
		icon: <IoWatchOutline size={30} />,
	},
	{
		label: "Gaming",
		link: "/products",
		icon: <PiGameControllerLight size={30} />,
	},
	{
		label: "View All",
		link: "/products",
		icon: <CiSquareMore size={30} />,
	},
];

const NavBar = () => {
	return (
		<div className="">
			<nav className="mt-8">
				<Wrapper className="h-[60px] flex justify-between items-center gap-4  ">
					<Link href="/">
						<img src="/sblogodes.png" className="w-[150px] " />
					</Link>
					{/* Search Container */}
					<div className="flex-1 basis-[500px] h-full md:flex flex-col items-center justify-center  hidden">
						<SearchContainer />
					</div>
					<div className="flex items-center gap-5 text-black">
						<CartIcon />
						<LuLayoutDashboard className="text-[15px] md:text-[20px]" />
						<DynamicUserIcon />
					</div>
				</Wrapper>
			</nav>
			<Wrapper className="h-[60px]  flex-1 ">
				{/* Search Container */}
				<div className="pb-1 flex items-center gap-4 mt-4">
					{StoreNavLinks.map((navLink) => (
						<Link
							href={navLink.link}
							className="font-light text-md hover:underline duration-200 transition-all"
						>
							<div className="flex items-center gap-2">
								{navLink.icon}
								{navLink.label}
							</div>
						</Link>
					))}
				</div>
				<button onClick={() => signOut()}>out</button>
				<Separator className="opacity-30" />
			</Wrapper>
			{/* Secondary Nav For Search  */}
			<Wrapper className="h-[60px] md:hidden flex justify-between items-center my-4 flex-1 ">
				{/* Search Container */}
				<div className="flex-1 basis-[500px] h-full md:flex items-center justify-center">
					<SearchContainer />
				</div>
			</Wrapper>
		</div>
	);
};

export default NavBar;
