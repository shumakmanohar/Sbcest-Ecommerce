import Footer2 from "@/components/store/Footer2";
import NavBar from "@/components/store/NavBar";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<NavBar />
			{children}
			<Footer2 />
		</div>
	);
}
