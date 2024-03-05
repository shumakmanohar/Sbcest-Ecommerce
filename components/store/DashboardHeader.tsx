"use client";
import { UserButton } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ name }: { name: string | undefined | null }) => {
	const activeLocale = useLocale();
	const { signOut } = useClerk();
	const router = useRouter();
	return (
		<div className="flex items-center gap-8 my-16">
			<div className="p-2 flex items-center justify-center rounded-full border-cyan-500 border">
				<UserButton afterSignOutUrl="/" />
			</div>
			<div className="grow">
				<h1 className="text-xl md:text-3xl font-semibold">
					{activeLocale === "en" ? "Hi" : "مرحبا"}👋
					<span className="mx-3">{name}</span>
				</h1>
				<button
					className="text-sm mt-2 text-cyan-700 font-semibold"
					onClick={() => signOut(() => router.push("/"))}
				>
					{activeLocale === "en" ? "Sign out" : "تسجيل الخروج"}
				</button>
			</div>
		</div>
	);
};

export default DashboardHeader;
