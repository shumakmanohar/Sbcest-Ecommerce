"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenuLink = ({
	_indx,
	icon,
	label,
	link,
}: {
	_indx: number;
	icon: JSX.Element;
	label: string;
	link: string;
}) => {
	const pathname = usePathname();
	return (
		<Link
			key={_indx}
			href={link}
			className={`w-full py-2.5 px-4 rounded  hover:bg-gray-700 transition duration-200 inline-flex gap-4 ${
				link === pathname && "bg-gray-700"
			}`}
		>
			{icon}
			{label}
		</Link>
	);
};

export default SideMenuLink;
