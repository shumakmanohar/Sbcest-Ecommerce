import React from "react";
import {
	ArchiveBoxIcon,
	Bars3Icon,
	GiftIcon,
	HomeIcon,
	InboxStackIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import SideMenuLink from "./SideMenuLink";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const sideMenuNavLinks = [
	{
		label: "Home",
		icon: <HomeIcon className="h-6 w-6 " />,
		link: "/cms",
	},
	{
		label: "Products",
		icon: <InboxStackIcon className="h-6 w-6 " />,
		link: "/cms/products",
	},
	{
		label: "Categories",
		icon: <ArchiveBoxIcon className="h-6 w-6" />,
		link: "/cms/categories",
	},
	{
		label: "Orders",
		icon: <GiftIcon className="h-6 w-6 " />,
		link: "/cms/orders",
	},
	{
		label: "Users",
		icon: <UserGroupIcon className="h-6 w-6 " />,
		link: "/cms/users",
	},
];
const NavBar = () => {
	return (
		<div className="container mt-8">
			<div className="flex  items-center justify-between">
				<h3 className="text-2xl font-bold">Sbcest / CMS</h3>
				<div className="flex gap-3">
					{sideMenuNavLinks.map(({ label, icon, link }, _indx) => (
						<SideMenuLink label={label} icon={icon} link={link} _indx={_indx} />
					))}
					<Sheet>
						<SheetTrigger className="md:hidden">
							<Bars3Icon className="w-6 h-6" />
						</SheetTrigger>
						<SheetContent side={"left"}>
							<SheetHeader>
								<SheetTitle>Sbcest / CMS</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</SheetDescription>
							</SheetHeader>
							{/* Nav Links */}
							<nav className=" flex gap-4 flex-col mt-16">
								{sideMenuNavLinks.map(({ label, icon, link }, _indx) => (
									<SideMenuLink
										label={label}
										icon={icon}
										link={link}
										_indx={_indx}
									/>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
