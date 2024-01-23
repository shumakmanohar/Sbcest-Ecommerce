import HeroBanner from "@/components/store/HeroBanner";
import NavBar from "@/components/store/NavBar";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
	return (
		<main>
			<NavBar />
			<HeroBanner />
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
