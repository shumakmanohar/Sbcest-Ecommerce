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
		</div>
	);
}
