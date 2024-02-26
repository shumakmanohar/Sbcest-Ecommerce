import AppleBanner from "@/components/store/AppleBanner";
import Banner from "@/components/store/Banner";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import GridLayout from "@/components/store/GridLayout";
import Hero from "@/components/store/Hero";
import HeroBanner from "@/components/store/HeroBanner";
import LogoCloud from "@/components/store/LogoCloud";
import MacVid from "@/components/store/MacVid";
import StyleCard from "@/components/store/StyleCard";
import Support from "@/components/store/Support";


import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Index");
	return (
		<main>
			{/* <Hero /> */}
			<HeroBanner />
			<Banner />
			<FeaturedProducts />
			<LogoCloud />
			<AppleBanner />
			<MacVid />
			{/* <GridLayout /> */}
			

			<StyleCard />
			<Support />
			
		</main>
	);
}
