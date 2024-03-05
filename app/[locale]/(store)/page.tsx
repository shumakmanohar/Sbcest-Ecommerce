import AppleBanner from "@/components/store/AppleBanner";
import Banner from "@/components/store/Banner";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import Hero from "@/components/store/Hero";
import LogoCloud from "@/components/store/LogoCloud";
import MacVid from "@/components/store/MacVid";
import StyleCard from "@/components/store/StyleCard";
import Support from "@/components/store/Support";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({ params }: { params: { locale: string } }) {
	console.log("LOCALE HERE : [Home]", params.locale);
	unstable_setRequestLocale(params.locale);
	return (
		<main>
			<Hero />
			{/* <HeroBanner /> */}
			<Banner />
			<FeaturedProducts />
			<LogoCloud />
			<AppleBanner />
			<MacVid />
			<StyleCard />
			<Support />
			{/* <h1>{t("title")}</h1> */}
		</main>
	);
}
