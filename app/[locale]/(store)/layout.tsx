import Footer from "@/components/store/Footer";
import Footer2 from "@/components/store/Footer2";
import NavBar from "@/components/store/NavBar";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-[#f7f7f7]">
			<NavBar />
			{children}
			<Footer />
		</div>
	);
}
