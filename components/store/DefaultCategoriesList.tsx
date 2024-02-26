import Link from 'next/link'
import { CiDesktopMouse1 } from "react-icons/ci";
import { GiSmartphone } from "react-icons/gi";
import { IoWatchOutline } from "react-icons/io5";
import { PiGameControllerLight } from "react-icons/pi";
import { CiSquareMore } from "react-icons/ci";

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
const DefaultCategoriesList = () => {
	return (
		<div className="pb-1 flex items-center gap-4">
			{StoreNavLinks.map((navLink, _indx) => (
				<Link
					key={_indx}
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
	);
};

export default DefaultCategoriesList;
