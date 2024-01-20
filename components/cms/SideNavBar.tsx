import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	ArchiveBoxIcon,
	ArrowLeftStartOnRectangleIcon,
	BeakerIcon,
	GifIcon,
	GiftIcon,
	HomeIcon,
	InboxStackIcon,
	UserGroupIcon,
} from "@heroicons/react/24/solid";
import SideMenuLink from "./SideMenuLink";

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

const SideNavBar = () => {
	return (
		<div className="w-64 bg-[#0D0A0A] p-4 fixed h-screen left-0">
			<Link href={"/cms"}>
				<div className="flex items-center justify-between mb-8 ">
					<div className="h-20 w-20  relative">
						<Image src={"/sblogo2.png"} fill alt="Company logo" />
					</div>
					<span className="w-[1px] h-[50px] bg-white "></span>
					<h3 className="text-3xl text-white font-extrabold opacity-50 tracking-wider">
						CMS
					</h3>
				</div>
			</Link>
			{/* Nav Links */}
			<nav className=" flex gap-4 flex-col mt-16">
				{sideMenuNavLinks.map(({ label, icon, link }, _indx) => (
					<SideMenuLink label={label} icon={icon} link={link} _indx={_indx} />
				))}
			</nav>

			{/* LogOut */}
			<div className="absolute bottom-4 w-64 px-4 right-0">
				<div className=" flex justify-between items-center">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="text-sm gap-2">
						<p>Admin@Sbcest</p>
						<span className="text-[#00ADB5]">View Store</span>
					</div>
					<ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-[#00ADB5] cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;
