"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

const DynamicUserIcon = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	if (!isLoaded || !isSignedIn)
		return (
			<Link href="/dashboard">
				<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
					<IoPersonOutline className="text-[19px] md:text-[24px]" />
				</div>
			</Link>
		);
	return <UserButton afterSignOutUrl="/" />;
};

export default DynamicUserIcon;
