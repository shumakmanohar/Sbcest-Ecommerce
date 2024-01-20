import SideNavBar from "@/components/cms/SideNavBar";
import { ThemeProvider } from "@/components/theme-provider";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex gap-8">
			<SideNavBar />
			{/* Content */}
			<div className="flex-1 container mx-auto">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</div>
		</div>
	);
}
