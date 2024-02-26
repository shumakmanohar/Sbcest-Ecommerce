"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from 'next/link'
import { LuLayoutDashboard } from "react-icons/lu";
import CartIcon from "./CartIcon";
import DynamicUserIcon from "./DynamicUserIcon";
import SearchContainer from "./SearchContainer";
import Image from "next/image";


const NavBar = () => {
	return (
		<div className="shadow-sm  mb-8 pt-4">
			<nav
				className={`w-full h-[50px] md:min-h-[80px] flex items-center justify-between   transition-transform duration-300 `}
			>
				{/* Main Nav */}
				<Wrapper className="h-[60px] flex justify-between items-center gap-4 ">
					<Link href="/">
						<Image 
							src="/sblogodes.png" 
							alt=""
							className="max-w-[145px] max-h-[50px] mx-auto object-contain" 
							width={200} 
							height={200} 
							quality={100} 
							sizes="145px"
						/>
						
					</Link>
					{/* Search Container */}
					<div className="flex-1 basis-[500px] h-full md:flex flex-col items-center justify-center hidden">
						<SearchContainer />
					</div>
					<div className="flex items-center gap-5 text-black">
						<CartIcon />
						<LuLayoutDashboard className="text-[15px] md:text-[20px]" />
						<DynamicUserIcon />
					</div>
				</Wrapper>
			</nav>

			{/* Secondary Nav For Search */}
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
