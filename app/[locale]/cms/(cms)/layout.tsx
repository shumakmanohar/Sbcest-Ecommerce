import { ThemeProvider } from "@/components/theme-provider";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";
import SideNavBar from "@/components/cms/SideNavBar";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await isAdmin())) {
		redirect("/");
	}
	return (
		<div className="w-full min-h-screen flex">
			{/* Content */}
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<SideNavBar />
				<div className="p-8 w-full">{children}</div>
			</ThemeProvider>
		</div>
	);
}
