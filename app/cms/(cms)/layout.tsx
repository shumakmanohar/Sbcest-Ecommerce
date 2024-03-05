import { ThemeProvider } from "@/components/theme-provider";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";
import SideNavBar from "@/components/cms/SideNavBar";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await isAdmin())) {
		// Throwing a notFoundPage for notSigned Users
		notFound();
		//redirect("/");
	}
	return (
		<div className="">
			{/* Content */}
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<div className="w-full min-h-screen flex">
					<SideNavBar />
					<div className="p-8 w-full">{children}</div>
				</div>
				<footer className="border text-sm text-center p-2">
					© 2024{" "}
					<a href="https://oflyne.co/" className="underline">
						oflyne.co
					</a>
					. All rights reserved. | CMS by oflyne.co.
				</footer>
			</ThemeProvider>
		</div>
	);
}
