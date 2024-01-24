import NavBar from "@/components/cms/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await isAdmin())) {
		redirect("/");
	}
	return (
		<div>
			{/* Content */}
			<div className="container mx-auto">
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<NavBar />
					{children}
				</ThemeProvider>
			</div>
		</div>
	);
}
