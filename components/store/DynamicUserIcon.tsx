"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

const DynamicUserIcon = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<div>
			{mounted && (
				<>
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
							<IoPersonOutline className="text-[19px] md:text-[24px]" />
						</div>
					</SignedOut>
				</>
			)}
		</div>
	);
};

export default DynamicUserIcon;
