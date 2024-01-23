import { UserButton } from "@clerk/nextjs";
export default function Home() {
	return (
		<main>
			FRONT END
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
