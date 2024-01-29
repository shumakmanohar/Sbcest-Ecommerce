import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/components/store/ReduxProvider";
import NavBar from "@/components/store/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<ClerkProvider>
			<ReduxProvider>
				<html lang={locale}>
					<body className={inter.className}>
						<Toaster position="top-right" reverseOrder={false} />
						{children}
					</body>
				</html>
			</ReduxProvider>
		</ClerkProvider>
	);
}
