"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from "react-redux";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import CartIcon from "./CartIcon";
import DynamicUserIcon from "./DynamicUserIcon";

const NavBar = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [showCatMenu, setShowCatMenu] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [show, setShow] = useState("translate-y-0");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [categories, setCategories] = useState(null);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow("-translate-y-[80px]");
			} else {
				setShow("shadow-sm");
			}
		} else {
			setShow("translate-y-0");
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const toggleSearch = () => {
		setShowSearch((prev) => !prev);
	};

	const closeSearch = () => {
		setShowSearch(false);
	};

	return (
		<div className="relative">
			<header
				className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
			>
				<Wrapper className="h-[60px] flex justify-between items-center">
					<Link href="/">
						<img src="/sblogodes.png" className="w-[87px] md:w-[150px] " />
					</Link>

					<Menu
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						categories={categories}
					/>

					{mobileMenu && (
						<MenuMobile
							showCatMenu={showCatMenu}
							setShowCatMenu={setShowCatMenu}
							setMobileMenu={setMobileMenu}
							categories={categories}
						/>
					)}

					<div className="flex items-center gap-2 text-black">
						<div
							className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative"
							onClick={toggleSearch}
						>
							<IoMdSearch className="text-[19px] md:text-[24px]" />
						</div>
						<CartIcon />
						<DynamicUserIcon />
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
							{mobileMenu ? (
								<VscChromeClose
									className="text-[16px]"
									onClick={() => setMobileMenu(false)}
								/>
							) : (
								<BiMenuAltRight
									className="text-[20px]"
									onClick={() => setMobileMenu(true)}
								/>
							)}
						</div>
					</div>
				</Wrapper>
			</header>

			{showSearch && (
				<>
					<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-40" />
					<div className="fixed top-0 right-0 p-4 z-50">
						<VscChromeClose
							className="text-[20px] cursor-pointer"
							onClick={closeSearch}
						/>
					</div>
					<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
						<Command style={{ width: "400px" }}>
							<CommandInput placeholder="Search Products.." />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup heading="Suggestions">
									<CommandItem>Notebooks/Laptops</CommandItem>
									<CommandItem>Tablets</CommandItem>
									<CommandItem>Desktops</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading="Settings">
									<CommandItem>Profile</CommandItem>
									<CommandItem>Billing</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</div>
				</>
			)}
		</div>
	);
};

export default NavBar;
