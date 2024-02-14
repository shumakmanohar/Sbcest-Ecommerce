"use client";

import {
	LayoutDashboard,
	Box,
	Gift,
	Settings,
	ChevronRight,
	BadgeInfo,
	PackageSearch,
	Store,
} from "lucide-react";
import { Nav } from "../ui/nav";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { UserButton } from "@clerk/nextjs";

const SideNavBar = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [mounted, setMounted] = useState(false);
	const onlyWidth = useWindowWidth();
	const mobileWidth = onlyWidth < 768;
	function toggleSidebar() {
		setIsCollapsed(!isCollapsed);
	}

	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
			{mounted && !mobileWidth && (
				<div className="absolute right-[-20px] top-7">
					<Button
						onClick={toggleSidebar}
						variant="secondary"
						className=" rounded-full p-2"
					>
						<ChevronRight />
					</Button>
				</div>
			)}
			<Nav
				isCollapsed={mobileWidth ? true : isCollapsed}
				links={[
					{
						title: "Dashboard",
						href: "/cms/",
						icon: LayoutDashboard,
						variant: "default",
					},
					{
						title: "Products",
						href: "/cms/products",
						icon: PackageSearch,
						variant: "ghost",
					},
					{
						title: "Categories",
						href: "/cms/categories",
						icon: Box,
						variant: "ghost",
					},
					{
						title: "Orders",
						href: "/cms/orders",
						icon: Gift,
						variant: "ghost",
					},

					{
						title: "Info",
						href: "/cms/about",
						icon: BadgeInfo,
						variant: "ghost",
					},
					{
						title: "Visit Store",
						href: "/",
						icon: Store,
						variant: "ghost",
					},
				]}
			/>
			<div className="absolute bottom-6 right-[20px]">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default SideNavBar;
